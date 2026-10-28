
FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update && apt-get install -y python3 python3-venv \
    && rm -rf /var/lib/apt/lists/*

RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

COPY . .

RUN pip install --no-cache-dir -r backend/requirements.txt gunicorn

RUN cd frontend && npm run build

EXPOSE 3000

CMD ["bash", "backend/start.sh"]
