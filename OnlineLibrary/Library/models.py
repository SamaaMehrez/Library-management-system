from django.db import models

# Create your models here.
from django.db import models


# Create your models here.
class Members(models.Model):
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    userType = models.CharField(max_length=255)


class Book(models.Model):
    book_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    description = models.TextField()
    availability = models.CharField(
        max_length=20,
        choices=[("Available", "Available"), ("Not Available", "Not Available")]
    )
    trending = models.CharField(
        max_length=3,
        choices=[("Yes", "Yes"), ("No", "No")],
        default="No"
    )
    cover = models.ImageField(upload_to='book_covers/')

class Favorite(models.Model):
    email = models.CharField(max_length=255,)
    book_id = models.CharField(max_length=50,)

    class Meta:
        unique_together = ('email', 'book_id')  # prevent duplicates