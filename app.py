from flask import Flask, render_template, request, jsonify
from chat import answer_question  # Import the chatbot logic

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit_contact', methods=['POST'])
def submit_contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        subject = request.form.get('subject')
        message = request.form.get('message')
        
        # Here you would typically save this data to a database
        # or send an email notification
        
        return jsonify({
            'success': True,
            'message': 'Form submitted successfully!'
        })

@app.route('/chat', methods=['POST'])
def chat():
    if request.method == 'POST':
        user_input = request.form.get('message')
        if not user_input:
            return jsonify({'success': False, 'message': 'Message cannot be empty'})

        try:
            # Call the answer_question function from chat.py
            response = answer_question(user_input)
            return jsonify({'success': True, 'message': response})
        except Exception as e:
            return jsonify({'success': False, 'message': f'Error processing query: {str(e)}'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)