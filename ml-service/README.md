# WasteWise ML Service

Serviciul de Machine Learning pentru aplicația WasteWise, implementat cu Python, FastAPI și scikit-learn/TensorFlow.

## Structură

```
ml-service/
├── app/
│   ├── api/               # API FastAPI
│   │   ├── endpoints/     # Endpoint-uri API
│   │   ├── dependencies.py# Dependențe API
│   │   ├── security.py    # Securitate API
│   │   └── router.py      # Router API
│   ├── core/              # Configurații de bază
│   │   ├── config.py      # Configurație aplicație
│   │   ├── security.py    # Utilități securitate
│   │   └── logging.py     # Configurație logging
│   ├── db/                # Acces bază de date
│   ├── models/            # Modele ML
│   │   ├── prediction/    # Modele pentru predicții
│   │   ├── optimization/  # Modele pentru optimizare
│   │   └── training/      # Logică pentru antrenare
│   └── utils/             # Utilități
├── tests/                 # Teste
├── data/                  # Date pentru modele
│   ├── raw/               # Date brute
│   ├── processed/         # Date procesate
│   └── models/            # Modele salvate
├── notebooks/             # Jupyter notebooks pentru explorare
├── .env.example           # Exemplu variabile de mediu
├── requirements.txt       # Dependențe Python
└── Dockerfile             # Configurație Docker
```

## Instalare

```bash
# Creare mediu virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# sau
venv\Scripts\activate     # Windows

# Instalare dependențe
pip install -r requirements.txt

# Copiere fișier .env
cp .env.example .env
```

## Rulare

```bash
# Dezvoltare
uvicorn app.main:app --reload

# Producție
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Teste

```bash
# Rulare teste
pytest

# Rulare teste cu acoperire
pytest --cov=app tests/
```
