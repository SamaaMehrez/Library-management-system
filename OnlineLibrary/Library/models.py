from django.db import models

# Create your models here.
from django.db import models
from datetime import timedelta


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
        unique_together = ('email', 'book_id')

class BorrowedBooks(models.Model):
    email = models.CharField(max_length=255)
    book_id = models.CharField(max_length=50)
    borrow_date = models.DateField(auto_now_add=True)
    return_date = models.DateField(null=True, blank=True)

    def save(self, *args, **kwargs):
        # Set return date only if it's not already set
        if not self.pk or not self.return_date:
            # Make sure borrow_date is set before using it
            if not self.borrow_date and self.pk is None:
                from django.utils import timezone
                self.borrow_date = timezone.now().date()
            self.return_date = self.borrow_date + timedelta(days=7)
        super().save(*args, **kwargs)