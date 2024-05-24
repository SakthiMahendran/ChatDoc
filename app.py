from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/data', methods=['POST'])
def handle_data():
    # Get the request method
    method = request.method
    
    # Get the JSON data from the request
    data = request.get_json()
    
    # Print the method and data to the console (for debugging purposes)
    print(f"Method: {method}")
    print(f"Data: {data}")
    
    # Return a JSON response with the method and data
    response = {
        'method': method,
        'data': data
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
