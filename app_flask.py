from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

# FastAPI backend URL
FASTAPI_URL = "http://localhost:8000/ask"
QDRANT_CHECK_URL = "http://localhost:8000/check-qdrant-cloud"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    if request.method == 'POST':
        user_input = request.form.get('message')
        if not user_input:
            return jsonify({'success': False, 'message': 'Message cannot be empty'})

        # Send the user input to the FastAPI backend
        try:
            response = requests.post(FASTAPI_URL, json={"question": user_input})
            response.raise_for_status()
            result = response.json()
            return jsonify({'success': True, 'message': result['answer']})
        except requests.exceptions.RequestException as e:
            return jsonify({'success': False, 'message': f'Error communicating with chatbot: {str(e)}'})

@app.route('/check-qdrant', methods=['GET'])
def check_qdrant():
    try:
        response = requests.get(QDRANT_CHECK_URL)
        response.raise_for_status()
        result = response.json()
        return jsonify({'success': True, 'status': result})
    except requests.exceptions.RequestException as e:
        return jsonify({'success': False, 'message': f'Error checking Qdrant Cloud: {str(e)}'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)