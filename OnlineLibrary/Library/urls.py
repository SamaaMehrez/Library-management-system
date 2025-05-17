from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('', views.index, name='index'),
    path('userdashboard/', views.user_dashboard, name='user_dashboard'),
    path('admindashboard/', views.admin_dashboard, name='admin_dashboard'),
    path('logout/', views.logout_view, name='logout'),
    path('user/', views.user, name='user'),
    path('login/', views.login, name='login'),
    path('contact/', views.contact, name='contact'),
    path('addbooks/', views.add_books, name='add_books'),
    path('editbooks/<str:book_id>/', views.edit_book, name='edit_book'),
    path('deletebooks/<str:book_id>/', views.delete_book, name='delete_book'),
    path('book/<str:book_id>/', views.book_details, name='book_details'),
    path('Error/', views.errorMessage, name='errorMessage'),
    path('userAuthnticated/', views.userAuthnticated, name='user_authenticated'),
    path('add_to_favorites/', views.add_to_favorites, name='add_to_favorites'),
]

