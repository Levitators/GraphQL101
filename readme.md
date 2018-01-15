# GraphQL 101

### List of Queries available

```js
mutation Createuser {
  createStudent(username: "", department: "", email_id: "", password: "", joined_date: "", sex: M) {
    username
    user_id
    department
  }
}
```

```js
query fetchStudent{
  student(email_id: ""){
    username
    user_id
    joined_date
    department
    email_id
  }
}
```

```js
query fetchBook{
  book(book_id: 1){
    title
    author
    book_id
    rented
    rent_id
  }
}
```

```js
mutation rentBook {
  rentBook(book_id: 1, user_id: 1, days: 30) {
    rent_id
    title
  }
}
```