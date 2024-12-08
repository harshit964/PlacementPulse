import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
import pickle

# Load the dataset
file_path = 'datasets/Predicted_data.csv'  # Update path as needed
data = pd.read_csv(file_path)

# Drop unnecessary columns, including 'branch'
data_cleaned = data.drop(columns=['s_id', 'name', 'profile_link', 'other_skills', 'branch'])

# Drop rows with missing target values (salary_as_fresher)
data_cleaned = data_cleaned.dropna(subset=['salary_as_fresher'])

# Fill missing numerical values with the mean of each column
numerical_columns = data_cleaned.select_dtypes(include=['float64', 'int64']).columns
data_cleaned[numerical_columns] = data_cleaned[numerical_columns].fillna(data_cleaned[numerical_columns].mean())

# Fill missing categorical values with the mode
categorical_columns = data_cleaned.select_dtypes(include=['object']).columns
for col in categorical_columns:
    data_cleaned[col] = data_cleaned[col].fillna(data_cleaned[col].mode()[0])

# One-hot encode categorical features
data_encoded = pd.get_dummies(data_cleaned, columns=categorical_columns, drop_first=True)

# Separate features and target variable
X = data_encoded.drop(columns=['salary_as_fresher'])
y = data_encoded['salary_as_fresher']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define models to evaluate
models = {
    'LinearRegression': LinearRegression(),
    'Ridge': Ridge(),
    'Lasso': Lasso(),
    'RandomForest': RandomForestRegressor(random_state=42)
}

# Hyperparameters for grid search
param_grid = {
    'Ridge': {'alpha': [0.1, 1.0, 10.0]},
    'Lasso': {'alpha': [0.01, 0.1, 1.0]},
    'RandomForest': {'n_estimators': [50, 100, 200], 'max_depth': [None, 10, 20]}
}

# Dictionary to store model performance
model_performance = {}

# Loop over each model, apply GridSearchCV where applicable, and evaluate
for model_name, model in models.items():
    if model_name in param_grid:
        # Use grid search for models with defined hyperparameters
        grid_search = GridSearchCV(estimator=model, param_grid=param_grid[model_name], cv=5, scoring='neg_mean_squared_error')
        grid_search.fit(X_train, y_train)
        best_model = grid_search.best_estimator_
    else:
        # Train the model without hyperparameter tuning
        best_model = model.fit(X_train, y_train)

    # Predict and evaluate on test set
    y_pred = best_model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)
    
    # Store performance
    model_performance[model_name] = {'MSE': mse, 'R2': r2, 'Model': best_model}

# Identify the best model based on R2 score
best_model_name = max(model_performance, key=lambda x: model_performance[x]['R2'])
best_model = model_performance[best_model_name]['Model']

# Save the best model as a pickle file
with open('salaryPred.pkl', 'wb') as file:
    pickle.dump(best_model, file)

print(f"Best Model: {best_model_name}")
print(f"R2 Score: {model_performance[best_model_name]['R2']}")
print(f"MSE: {model_performance[best_model_name]['MSE']}")
