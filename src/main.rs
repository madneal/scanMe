use std::fs::File;
use std::io::{BufRead, BufReader};

#[derive(Debug)]
struct AccessLogEntry {
    ip: String,
    timestamp: u64,
    request: String,
    status_code: u16,
    user_agent: String,
}

fn main() {
    println!("Hello, world!");
    parse_log_file("README.md");
}

fn parse_log_file(filename: &str) {
    let file = match File::open(filename) {
        Ok(file) => file,
        Err(error) => panic!("There was a problem opening the file: {:?}", error),
    };

    let reader = BufReader::new(file);

    for line in reader.lines() {
        if let Ok(line) = line {
            println!("{}", line);
        }
    }
}