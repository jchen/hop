use super::*;

pub struct GCal {}
impl Domain for GCal {
    const URL: &'static str = "https://calendar.google.com";
    const DOMAIN_DOC: &'static str = "Google Calendar";
}

pub struct GDrive {}
impl Domain for GDrive {
    const URL: &'static str = "https://drive.google.com";
    const DOMAIN_DOC: &'static str = "Google Drive";
}

pub struct GMail {}
impl Domain for GMail {
    const URL: &'static str = "https://mail.google.com";
    const DOMAIN_DOC: &'static str = "Gmail";
}

pub struct NewYorkTimes {}
impl Domain for NewYorkTimes {
    const URL: &'static str = "https://www.nytimes.com";
    const DOMAIN_DOC: &'static str = "the New York Times";
}

pub struct CoursesAtBrown {}
impl Domain for CoursesAtBrown {
    const URL: &'static str = "https://cab.brown.edu/";
    const DOMAIN_DOC: &'static str = "Courses@Brown";
}

pub struct CriticalReview {}
impl Domain for CriticalReview {
    const URL: &'static str = "https://thecriticalreview.org/";
    const DOMAIN_DOC: &'static str = "The Critical Review";
}

pub struct Ask {}
impl Domain for Ask {
    const URL: &'static str = "https://ask.brown.edu/";
    const DOMAIN_DOC: &'static str = "Brown ASK (Advising SideKick)";
}
