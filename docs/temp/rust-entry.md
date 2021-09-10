# Rust

```
cargo new folderName // 等同npm init
cargo run // 等同npm start
cargo build // 等同npm install
```

``` js

use std::io;

fn main() {
    println!("Guess the number!");

    println!("Please input your guess.");

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");

    println!("You guessed: {}", guess);
}
```