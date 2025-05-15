from django.shortcuts import render, get_object_or_404

# Create your views here.
from django.shortcuts import render, redirect
from .models import Members

from .models import Book
from django.core.files.storage import FileSystemStorage


def add_books(request):
    if request.method == 'POST':
        book_id = request.POST.get('book-id')
        name = request.POST.get('book-name')
        author = request.POST.get('author')
        category = request.POST.get('category')
        description = request.POST.get('description')
        availability = request.POST.get('Available')
        trending = request.POST.get('trending') == 'Yes'
        if trending:
            trending = 'Yes'
        else:
            trending = 'No'

        # File upload
        cover = request.FILES.get('book-cover')

        # Save book
        book = Book(
            book_id=book_id,
            name=name,
            author=author,
            category=category,
            description=description,
            availability=availability,
            trending=trending,
            cover=cover
        )
        if Book.objects.filter(book_id=book_id).exists():
            return render(request, 'AddBooks.html', {'error': 'The Book already exists.'})
        book.save()
        return redirect('admin_dashboard')

        # Redirect to same page or another success page

    return render(request, 'AddBooks.html')


def edit_book(request, book_id):
    book = get_object_or_404(Book, book_id=book_id)
    if request.method == 'POST':
        # Update book fields from form data
        book.name = request.POST.get('book-name')
        book.author = request.POST.get('author')
        book.category = request.POST.get('category')
        book.description = request.POST.get('description')
        book.availability = request.POST.get('Available')
        book.trending = request.POST.get('trending') == 'Yes'
        if book.trending:
            book.trending = 'Yes'
        else:
            book.trending = 'No'
        # Handle cover file if uploaded
        if request.FILES.get('book-cover'):
            book.cover = request.FILES.get('book-cover')

        book.save()
        return redirect('admin_dashboard')

    return render(request, 'EditBooks.html', {'book': book})


def delete_book(request, book_id):
    book = get_object_or_404(Book, book_id=book_id)
    if request.method == 'POST':
        book.delete()
        return redirect('admin_dashboard')


def signup(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        userType = request.POST.get('userType')

        if Members.objects.filter(email=email).exists():
            return render(request, 'SignUp.html', {'error': 'Email already exists. Please use a different email.'})

        member = Members(username=username, email=email, password=password, userType=userType)
        member.save()

        # حفظ نوع المستخدم في الجلسة
        request.session['userType'] = userType.lower()

        # عرض صفحة الـ Dashboard مباشرة بدلاً من redirect
        if userType.lower() == 'admin':
            return redirect('admin_dashboard')  # بدلاً من redirect
        else:
            return redirect('user')  # بدلاً من redirect

    return render(request, 'SignUp.html')


def index(request):
    return render(request, 'Home.html')


def user(request):
    trending_books = Book.objects.filter(trending='Yes')
    all_books = Book.objects.all()
    return render(request, 'user.html', {
        'trending_books': trending_books,
        'all_books': all_books,
    })


def book_details(request, id):
    book = get_object_or_404(Book, id=id)
    return render(request, 'BooksDetails.html', {'book': book})
def contact(request):
    return render(request, 'ContactUs.html')


def user_dashboard(request):
    return render(request, 'UserAccount.html')


def admin_dashboard(request):
    books = Book.objects.all()
    return render(request, 'Admin.html', {'books': books})


def logout_view(request):
    return render(request, 'Home.html')


def login(request):
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')
        userType = request.POST.get('userType')

        if not email or not password or not userType:
            return render(request, 'Login.html', {'error': 'Please fill all fields.'})

        try:
            user = Members.objects.get(email=email)
        except Members.DoesNotExist:
            return render(request, 'Login.html', {'error': 'Email not found.'})

        # تحقق من الباسورد ونوع المستخدم
        if user.password != password or user.userType.lower() != userType.lower():
            return render(request, 'Login.html', {'error': 'Incorrect password or role.'})

        # حفظ نوع المستخدم في السيشن
        request.session['userType'] = user.userType.lower()

        # توجيه المستخدم بناءً على نوعه
        if user.userType.lower() == 'admin':
            return redirect('admin_dashboard')  # أو استخدم redirect
        else:
            return redirect('user')  # أو redirect

    return render(request, 'Login.html')
