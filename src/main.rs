use std::fs::File;
use std::io::{BufRead, BufReader};
use chrono::{DateTime, FixedOffset};

#[derive(Debug)]
struct AccessLogEntry {
    ip: String,
    remote_user: Option<String>,
    user: Option<String>,
    datetime: DateTime<FixedOffset>,
    method: String,
    path: String,
    protocol: String,
    status: u16,
    length: Option<usize>,
    referer: Option<String>,
    user_agent: Option<String>,
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