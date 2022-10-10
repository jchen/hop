#[macro_export]
macro_rules! assert_hop_redirect {
    ( $q:expr => $redirect:expr ) => {{
        let url = hop($q);
        assert_eq!(url, Url::parse($redirect).unwrap());
    }};
}
