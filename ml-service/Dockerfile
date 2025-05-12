FROM python:3.11-slim

WORKDIR /app

# Instalare dependențe
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiere cod sursă
COPY . .

# Expunere port
EXPOSE 8000

# Comandă de pornire
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
