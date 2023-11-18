# views.py
from django.http import JsonResponse

def hello_api(request):
    data = {'message': 'Hello, API!'}
    return JsonResponse(data)