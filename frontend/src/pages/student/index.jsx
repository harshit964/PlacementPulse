import { useState } from 'react';
import styles from './PredictionForm.module.css';

export const Student = () =>{
  const [formData, setFormData] = useState({
    Quants: '',
    LogicalReasoning: '',
    Verbal: '',
    Programming: '',
    CGPA: '',
    Networking: '',
    CloudComp: '',
    WebServices: '',
    DataAnalytics: '',
    QualityAssurance: '',
    AI: '',
    Gender: '0',  // 0 for female, 1 for male
    '10th_marks': '',
    '12th_marks': '',
    Cgpa: '',
    'Internships': '0', // 0 for No, 1 for Yes
    'Training': '0',
    'Backlog': '0',
    'InnovativeProject': '0',
    'CommunicationLevel': '1', // 1-5 scale
    'TechnicalCourse': '0'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataArray = [
        parseFloat(formData.Quants),
        parseFloat(formData.LogicalReasoning),
        parseFloat(formData.Verbal),
        parseFloat(formData.Programming),
        parseFloat(formData.CGPA),
        parseFloat(formData.Networking),
        parseFloat(formData.CloudComp),
        parseFloat(formData.WebServices),
        parseFloat(formData.DataAnalytics),
        parseFloat(formData.QualityAssurance),
        parseFloat(formData.AI),
        parseInt(formData.Gender),
        parseFloat(formData['10th_marks']),
        parseFloat(formData['12th_marks']),
        parseFloat(formData.Cgpa),
        parseInt(formData.Internships),
        parseInt(formData.Training),
        parseInt(formData.Backlog),
        parseInt(formData.InnovativeProject),
        parseInt(formData.CommunicationLevel),
        parseInt(formData.TechnicalCourse)
      ];

      console.log('Sending data:', dataArray);

      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ Data: dataArray })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Prediction result:', data);
      alert(`Prediction Result: ${data.ans}`);
      
    } catch (error) {
      console.error('Error during prediction:', error);
      alert('Error making prediction. Check console for details.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <div className={styles.grid}>
          {/* Aptitude Scores */}
          <div className={styles.grid_item}>
            <input
              type="number"
              name="Quants"
              placeholder="Quantitative Score (0-25)"
              min="0"
              max="25"
              value={formData.Quants}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.grid_item}>
            <input
              type="number"
              name="LogicalReasoning"
              placeholder="Logical Reasoning Score (0-25)"
              min="0"
              max="25"
              value={formData.LogicalReasoning}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.grid_item}>
            <input
              type="number"
              name="Verbal"
              placeholder="Verbal Score (0-25)"
              min="0"
              max="25"
              value={formData.Verbal}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.grid_item}>
            <input
              type="number"
              name="Programming"
              placeholder="Programming Score (0-10)"
              min="0"
              max="10"
              step="0.1"
              value={formData.Programming}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.grid_item}>
            <input
              type="number"
              name="CGPA"
              placeholder="CGPA (0-10)"
              min="0"
              max="10"
              step="0.01"
              value={formData.CGPA}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.grid_item}>
            <input
              type="number"
              name="Networking"
              placeholder="Networking Skills (0-10)"
              min="0"
              max="10"
              step="0.1"
              value={formData.Networking}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.grid_item}>
            <input
              type="number"
              name="CloudComp"
              placeholder="Cloud Computing Skills (0-10)"
              min="0"
              max="10"
              step="0.1"
              value={formData.CloudComp}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.grid_item}>
            <input
              type="number"
              name="WebServices"
              placeholder="Web Services Skills (0-10)"
              min="0"
              max="10"
              step="0.1"
              value={formData.WebServices}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.grid_item}>
            <input
              type="number"
              name="DataAnalytics"
              placeholder="Data Analytics Skills (0-10)"
              min="0"
              max="10"
              step="0.1"
              value={formData.DataAnalytics}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.grid_item}>
            <input
              type="number"
              name="QualityAssurance"
              placeholder="Quality Assurance Skills (0-10)"
              min="0"
              max="10"
              step="0.1"
              value={formData.QualityAssurance}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.grid_item}>
            <input
              type="number"
              name="AI"
              placeholder="AI Skills (0-10)"
              min="0"
              max="10"
              step="0.1"
              value={formData.AI}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.grid_item}>
            <label>
              Gender:
              <select name="Gender" value={formData.Gender} onChange={handleChange}>
                <option value="0">Female</option>
                <option value="1">Male</option>
              </select>
            </label>
          </div>

          <div className={styles.grid_item}>
            <input
              type="number"
              name="10th_marks"
              placeholder="10th Marks (%)"
              min="0"
              max="100"
              step="0.01"
              value={formData['10th_marks']}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.grid_item}>
            <input
              type="number"
              name="12th_marks"
              placeholder="12th Marks (%)"
              min="0"
              max="100"
              step="0.01"
              value={formData['12th_marks']}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.grid_item}>
            <input
              type="number"
              name="Cgpa"
              placeholder="Current CGPA"
              min="0"
              max="10"
              step="0.01"
              value={formData.Cgpa}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.grid_item}>
            <label>
              Internships:
              <select name="Internships" value={formData.Internships} onChange={handleChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </label>
          </div>

          <div className={styles.grid_item}>
            <label>
              Training:
              <select name="Training" value={formData.Training} onChange={handleChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </label>
          </div>

          <div className={styles.grid_item}>
            <label>
              Backlog:
              <select name="Backlog" value={formData.Backlog} onChange={handleChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </label>
          </div>

          <div className={styles.grid_item}>
            <label>
              Innovative Project:
              <select name="InnovativeProject" value={formData.InnovativeProject} onChange={handleChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </label>
          </div>

          <div className={styles.grid_item}>
            <label>
              Communication Level:
              <select name="CommunicationLevel" value={formData.CommunicationLevel} onChange={handleChange}>
                {[1, 2, 3, 4, 5].map(level => (
                  <option key={level} value={level}>Level {level}</option>
                ))}
              </select>
            </label>
          </div>

          <div className={styles.grid_item}>
            <label>
              Technical Course:
              <select name="TechnicalCourse" value={formData.TechnicalCourse} onChange={handleChange}>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </label>
          </div>

          <button type="submit" className={styles.submit_button} onClick={handleSubmit}>
            Predict Placement
          </button>
        </div>
      </form>
    </div>
  );
};

export default Student;