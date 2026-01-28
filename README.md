# Docker Monitor

A small Node.js / NestJS app to monitor your Docker containers and notify you via email when any container stops. This app is designed to run with Docker Compose — no Node.js setup required.

## Features

* Monitor all running Docker containers periodically
* Send email notifications when a container stops
* Configurable check interval
* Maintains state between restarts
* Works out-of-the-box with Docker Compose

## Requirements

* Docker
* Docker Compose
* An SMTP email account to send notifications

## Quick Start

1. Clone the repository (or download the `docker-compose.yml`):

```bash
git clone https://github.com/yourusername/docker-monitor.git
cd docker-monitor
```

2. Configure environment variables directly inside `docker-compose.yml` under the `environment:` section for the service. Example:

```yaml
version: '3.9'
services:
  docker-monitor:
    image: javidev99/docker-monitor-helper:latest
    container_name: docker-monitor-helper
    restart: unless-stopped
    ports:
      - 7676:7676
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./state:/app/state
    environment:
      SMTP_HOST: smtp.gmail.com
      SMTP_PORT: 587
      SMTP_USER: user_to_send_notifications@gmail.com
      SMTP_PASS: // password app to use SMTP_USER account to send notifications
      EMAIL_FROM: // same as SMTP_USER
      EMAIL_TO: // who is going to receive the notification
```

> ⚠️ Do not commit your `docker-compose.yml` with real email credentials if sharing publicly.

3. Start the monitor:

```bash
docker-compose up -d
```

* The service will start in the background
* Logs can be viewed with:

```bash
docker-compose logs -f
```

4. Stop / remove the monitor:

```bash
docker-compose down
```

This will stop and remove the container but **keep your `state` folder** for future runs.

## Configuration

| Variable                 | Description                                         | Example                                       |
| ------------------------ | --------------------------------------------------- | --------------------------------------------- |
| `MAIL_HOST`              | SMTP server host                                    | smtp.gmail.com                                |
| `MAIL_PORT`              | SMTP server port                                    | 587                                           |
| `MAIL_USER`              | Email username                                      | [myemail@gmail.com](mailto:myemail@gmail.com) |
| `MAIL_PASS`              | Email password / app password                       | secret                                        |
| `MAIL_TO`                | Recipient email for alerts                          | [alert@example.com](mailto:alert@example.com) |
| `EMAIL_FROM`             | Sender email address                                | [myemail@gmail.com](mailto:myemail@gmail.com) |

## Notes

* The app logs to stdout/stderr, which works seamlessly with Docker logging.
* The monitored state is stored in `state/state.json` — persisted across container restarts.
* Environment variables are set directly in the `docker-compose.yml` file for simplicity.
