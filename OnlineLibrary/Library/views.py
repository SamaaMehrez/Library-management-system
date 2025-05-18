from django.shortcuts import render, get_object_or_404

# Create your views here.
from django.shortcuts import render, redirect
from .models import Members

from .models import Book
from .models import Favorite, BorrowedBooks
from django.core.files.storage import FileSystemStorage
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

from django.views.decorators.csrf import csrf_exempt


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
        print(book)
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
        request.session['email'] = user.email
        request.session['password'] = user.password
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


def book_details(request,book_id,msg=""):
    book = get_object_or_404(Book, book_id=book_id)
    email=request.session.get('email')
    fav = Favorite(
            email=email,
            book_id=book_id
        )
    
    if BorrowedBooks.objects.filter(email=email, book_id=book_id).exists() and Favorite.objects.filter(email=email, book_id=book_id).exists():
        msg="Book already borrowed and in favorites."
        return render(request, 'BooksDetails.html',{'book': book, 'msg': msg})
    if Favorite.objects.filter(email=email, book_id=book_id).exists():
        msg="Book already in favorites."

        return render(request, 'BooksDetails.html',{'book': book, 'msg': msg})
    if BorrowedBooks.objects.filter(email=email, book_id=book_id).exists():
        msg="Book already borrowed."
        return render(request, 'BooksDetails.html',{'book': book, 'msg': msg})
    return render(request, 'BooksDetails.html',{'book': book, 'msg': msg})


def contact(request):
    return render(request, 'ContactUs.html')

def errorMessage(request):
    return render(request, 'Error404.html')
def user_dashboard(request):
    if 'userType' not in request.session:
        return redirect('errorMessage')
    return render(request, 'UserAccount.html')

def admin_dashboard(request):
    if request.session.get('userType') == 'user' or 'userType' not in request.session:
        return redirect('errorMessage')
    books = Book.objects.all()
    return render(request, 'Admin.html', {'books': books})


def logout_view(request):
    request.session.flush()
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
        request.session['email'] = user.email
        request.session['password'] = user.password

        # توجيه المستخدم بناءً على نوعه
        
        if user.userType.lower() == 'admin':
            return redirect('admin_dashboard')  # أو استخدم redirect
        else:
            return redirect('user')  # أو redirect

    return render(request, 'Login.html')



@csrf_exempt
def userAuthnticated(request):
    if 'userType' in request.session:
        return JsonResponse({'authenticated': True})
    else:
        return JsonResponse({'authenticated': False})


def add_to_favorites(request):

    if request.method == "POST":
        if 'email' not in request.session:
            msg="You are not a user, Please login"
            print(msg)
            return book_details(request, book_id=request.POST.get('Book-id'), msg=msg)
        bookId=request.POST.get('Book-id')
        email=request.session.get('email')
        fav = Favorite(
            email=email,
            book_id=bookId
        )
        if Favorite.objects.filter(email=email, book_id=bookId).exists():
            msg="Book already in favorites."
            fav = Favorite.objects.get(email=email, book_id=bookId)
            fav.delete()
            return redirect('user_dashboard')
        fav.save()
        print(fav)
        return redirect('user_dashboard')


    return JsonResponse({"error": "Invalid request"}, status=400)


def borrow_book(request):
    if request.method == "POST":
        book_id=request.POST.get('Book-id')
        email = request.session.get('email')
        if 'email' not in request.session:
            msg="You are not a user, Please login"
            print(msg)
            return book_details(request, book_id=request.POST.get('Book-id'), msg=msg)
    
        borrowed_book = BorrowedBooks(
            email=email,
            book_id=book_id
        )
        if BorrowedBooks.objects.filter(email=email, book_id=book_id).exists():
            msg="Book already borrowed."
            return redirect('user_dashboard')
        TheBook = Book.objects.get(book_id=book_id)
        print(TheBook.availability)
        if TheBook.availability == "Not Available":
            msg="Book not available."
            return book_details(request, book_id=request.POST.get('Book-id'), msg=msg)
        TheBook.availability = "Not Available"
        borrowed_book.save()
        return redirect('user_dashboard')
    return JsonResponse({'error': 'Invalid request'}, status=400)

def user_dashboard(request):
    if 'userType' not in request.session:
        return redirect('errorMessage')
    favbooks = Favorite.objects.filter(email=request.session.get('email'))
    borrowed_books = BorrowedBooks.objects.filter(email=request.session.get('email'))
    borrowed_books_list = []
    for borrowed_book in borrowed_books:
        book = Book.objects.get(book_id=borrowed_book.book_id)
        borrowed_books_list.append(book)
    favourite_books_list = []
    for favbook in favbooks:
        book = Book.objects.get(book_id=favbook.book_id)
        favourite_books_list.append(book)
    return render(request, 'UserAccount.html', {
        'Borrowed': borrowed_books_list,
        'Favourite': favourite_books_list,
    })
