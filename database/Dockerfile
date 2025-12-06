FROM postgres:15

ENV POSTGRES_USER=huy
ENV POSTGRES_PASSWORD=2003
ENV POSTGRES_DB=db
ENV PGUSER: huy
ENV POSTGRES_INITDB_ARGS: "--auth=md5"

COPY ./dump.sql /docker-entrypoint-initdb.d/