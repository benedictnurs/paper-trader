from flask import Flask, jsonify, request
import yfinance as yf
import os
import json

app = Flask(__name__)

@app.route("/api/stocks", methods=["GET"])
def get_stocks():
    try:
        file_path = os.path.join(os.getcwd(), 'api', 'stocks.json')
        if not os.path.exists(file_path):
            return jsonify({"error": f"File does not exist: {file_path}"}), 500

        with open(file_path, 'r') as file:
            stocks = json.load(file)
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

@app.route("/api/info", methods=["POST"])
def get_stock_info():
    data = request.json
    if not data or 'ticker' not in data:
        return jsonify({"error": "No ticker provided"}), 400

    ticker = data.get('ticker')
    stock = yf.Ticker(ticker)

    info = stock.info

    stock_info = {
        'price': info.get('currentPrice', 'N/A'),
        'change': info.get('regularMarketChangePercent', 'N/A'),
        'country': info.get('country', 'N/A'),
        'exchange': info.get('exchange', 'N/A'),
        'marketCap': info.get('marketCap', 'N/A'),
        'netIncome': info.get('netIncomeToCommon', 'N/A'),
        'industry': info.get('industry', 'N/A'),
        'sector': info.get('sector', 'N/A'),
        'summary': info.get('longBusinessSummary', 'No summary available'),
        'address': info.get('address1', 'N/A'),
        'revenue': info.get('totalRevenue', 'N/A'),
        'peRatio': info.get('trailingPE', 'N/A'),
        'dividendYield': info.get('dividendYield', 'N/A'),
        'risk': info.get('overallRisk', 'N/A'),
        'debtToEquity': info.get('debtToEquity', 'N/A'),
        'earningsGrowth': info.get('earningsQuarterlyGrowth', 'N/A'),
        'returnOnAssets': info.get('returnOnAssets', 'N/A'),
        'returnOnEquity': info.get('returnOnEquity', 'N/A'),
    }

    return jsonify(stock_info)

if __name__ == '__main__':
    app.run(debug=True)
