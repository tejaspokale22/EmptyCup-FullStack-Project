from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # enable CORS for all routes by default


@app.route("/api/designers")
def get_designers():
    with open("data.json") as f:
        data = json.load(f)
    return jsonify(data)                                            

if __name__ == "__main__":
    app.run(debug=True)
