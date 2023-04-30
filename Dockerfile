FROM denoland/deno:1.32.3

ARG URL=https://pokemon.mobyplaygrounds.com

ARG GIT_REVISION
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}
ENV LOCATION=${URL}
WORKDIR /app
COPY . .
RUN deno cache main.ts --import-map=import_map.json

EXPOSE 8000
CMD deno run -A --location ${LOCATION} main.ts