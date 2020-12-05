FROM python:3.6
ENV PYTHONUNBUFFERED 1
RUN mkdir /leagueb
WORKDIR /leagueb
ADD . /leagueb/
RUN pip install -r requirements.txt
RUN python manage.py makemigrations && python manage.py migrate
EXPOSE 8000
ENTRYPOINT ["python", "manage.py", "runserver", "0.0.0.0:8000"]