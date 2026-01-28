# ---------- BUILD STAGE ----------
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install all dependencies (dev + prod)
RUN npm ci

# Copy source
COPY . .

# Build NestJS
RUN npm run build

# ---------- RUNTIME STAGE ----------
FROM node:22-alpine

WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy built code from builder
COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production

CMD ["node", "dist/main.js"]
