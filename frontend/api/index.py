from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf
import os
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

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
            print(f"Stocks data: {stocks}")
        return jsonify(stocks)
    except Exception as e:
        print(f"Error reading file: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/api", methods=["POST"])
def get_stock_data():
    data = request.json
    if not data or 'ticker' not in data:
        return jsonify({"error": "No ticker provided"}), 400

    ticker = data.get('ticker')
    stock = yf.Ticker(ticker)
    hist = stock.history(period="max", interval="1mo")
    hist.index = hist.index.strftime('%Y-%m-%d')
    hist_dict = hist.to_dict(orient="index")
    return jsonify(hist_dict)

if __name__ == '__main__':
    app.run(debug=True)
