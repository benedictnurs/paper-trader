from flask import Flask, jsonify, request
import yfinance as yf
import os
import json

app = Flask(__name__)

@app.route("/api/stocks", methods=["GET"])
def get_stocks():
    try:
        # Ensure the current working directory is logged

        # Adjust the file path to the correct location of stocks.json
        file_path = os.path.join(os.getcwd(), 'api', 'stocks.json')


        # Check if the file exists
        if not os.path.exists(file_path):
            return jsonify({"error": f"File does not exist: {file_path}"}), 500

        # Open and read the file
        with open(file_path, 'r') as file:
            stocks = json.load(file)
        return jsonify(stocks)
    except Exception as e:
        print(f"Error reading file: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
