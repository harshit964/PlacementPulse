# Import necessary libraries
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import pickle

# Load the dataset
file_path = 'finalSynthesizedData.csv'  # Change this to your file path if needed
data = pd.read_csv(file_path)

# Drop unnecessary columns and separate features from the target
data = data.drop(columns=['Unnamed: 0'])  # Dropping the extra 'Cgpa' and unnamed column
X = data.drop(columns=['Placed'])
y = data['Placed']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Standardize the feature data
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Define models
models = {
    'SVM': SVC(),
    'Decision Tree': DecisionTreeClassifier(),
    'Random Forest': RandomForestClassifier(),
    'Logistic Regression': LogisticRegression()
}

# Train and evaluate each model
model_scores = {}
for model_name, model in models.items():
    model.fit(X_train, y_train)
    predictions = model.predict(X_test)
    accuracy = accuracy_score(y_test, predictions)
    model_scores[model_name] = accuracy

# Select the best model based on accuracy
best_model_name = max(model_scores, key=model_scores.get)
best_model = models[best_model_name]

# Save the best model to 'bm.pkl'
pickle_file_path = 'bm.pkl'  # Path to save the model file
with open(pickle_file_path, 'wb') as file:
    pickle.dump(best_model, file)

# Output the results
print("Model Performance:")
for model_name, accuracy in model_scores.items():
    print(f"{model_name}: {accuracy * 100:.2f}%")

print(f"\nBest model: {best_model_name} with accuracy: {model_scores[best_model_name] * 100:.2f}%")
print(f"Best model saved as {pickle_file_path}")
