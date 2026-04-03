FROM node:23-slim
WORKDIR /app
COPY learner-backend/package*.json ./
RUN npm install
COPY learner-backend/. .
EXPOSE 3001
CMD ["npm", "run", "dev"]