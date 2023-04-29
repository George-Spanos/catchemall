FROM denoland/deno:1.32.3

ARG GIT_REVISION
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}

WORKDIR /app
ARG location=https://pokemon.mobyplaygrounds.com
COPY . .
RUN deno cache main.ts --import-map=import_map.json --location ${location}

EXPOSE 8000

CMD ["run", "-A", "main.ts"]