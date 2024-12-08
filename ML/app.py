from flask import Flask, render_template, request
import pickle
import pandas as pd
import numpy as np
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression

with open('salaryPred.pkl', 'rb') as f:
    salary_model = pickle.load(f)
with open('best_model.pkl', 'rb') as f:
    placement_model = pickle.load(f)

app = Flask(__name__)

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/salary', methods=['GET', 'POST'])
def salary():
    if request.method == 'POST':
        # Extract input values from form
        inputs = [
            request.form['tier'],
            request.form['gender'],
            request.form['cgpa'],
            request.form['inter_gpa'],
            request.form['ssc_gpa'],
            request.form['internships'],
            request.form['projects'],
            request.form['hackathon'],
            request.form['is_participated_extracurricular'],
            request.form['no_of_programming_languages'],
            request.form['dsa'],
            request.form['mobile_dev'],
            request.form['web_dev'],
            request.form['Machine Learning'],
            request.form['cloud'],
            request.form['placed']
        ]
        inputs = np.array([inputs], dtype=float)

        # Predict salary
        predicted_salary = salary_model.predict(inputs)[0]
        return render_template('result.html', result=f"Predicted Salary: {predicted_salary:.2f} LPA")
    return render_template('salary_form.html')

@app.route('/placement', methods=['GET', 'POST'])
def placement():
    if request.method == 'POST':
        # Extract input values from form
        inputs = [
            request.form['Quants'],
            request.form['LogicalReasoning'],
            request.form['Verbal'],
            request.form['Programming'],
            request.form['CGPA'],
            request.form['Networking'],
            request.form['CloudComp'],
            request.form['WebServices'],
            request.form['DataAnalytics'],
            request.form['Quality'],
            request.form['AI']
        ]
        inputs = np.array([inputs], dtype=float)

        # Predict placement
        placed = placement_model.predict(inputs)[0]
        placement_status = "Placed" if placed == 1 else "Not Placed"
        return render_template('result.html', result=f"Placement Prediction: {placement_status}")
    return render_template('placement_form.html')

if __name__ == '__main__':
    app.run(debug=True)
