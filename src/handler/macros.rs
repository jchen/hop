#[macro_export]
macro_rules! hop {
    (
        // Rules
        $(
            [ $( $cmd:expr ),+ => $hopper:ident $domain:ident ]
        )*
        // Default
        default [ $default:ident $default_domain:ident ]
        empty [ $empty:ident $empty_domain:ident ]
    ) => {
        /// A Hop search that returns a Url to redirect to.
        fn hop(query: &str) -> Url {
            let query_string = query;
            let index_of_space = query_string.find(' ').unwrap_or(query_string.len());
            let command = &query_string[..index_of_space];
            let args = &query_string[index_of_space..].trim();
            match command {
                $( // Commands
                    $( // Command aliases
                        $cmd => $hopper::<$domain>::hop(args),
                    )+
                )*
                "" => $empty::<$empty_domain>::hop(args),
                _ => $default::<$default_domain>::hop(query_string),
            }
        }

        /// Returns a table of commands and their documentation
        fn doc() -> String {
            let mut doc = String::new();
            doc.push_str("<table>");

            // Title Row
            doc.push_str("<thead><tr><th>COMMAND</th><th>DESCRIPTION</th></tr></thead>");

            doc.push_str("<tbody>");
            // Command Rules
            $(
                doc.push_str("<tr><td class='command'>");
                $(
                    doc.push_str($cmd);
                    doc.push_str(" ");
                )+
                doc.push_str("</td><td>");
                doc.push_str(&$hopper::<$domain>::doc().to_owned());
                doc.push_str("</td></tr>");
            )*

            // Default Rule
            doc.push_str("<tr><td><i>Default Query</i></td><td>");
            doc.push_str(&$default::<$default_domain>::doc().to_owned());
            doc.push_str("</td></tr>");

            // Empty Query Rule
            doc.push_str("<tr><td><i>Empty Query</i></td><td>");
            doc.push_str(&$empty::<$empty_domain>::doc().to_owned());
            doc.push_str("</td></tr>");

            // End table
            doc.push_str("</tbody>");
            doc.push_str("</table>");
            doc
        }
    }
}

#[macro_export]
macro_rules! extract {
    (
        $(
            [ $hopper:ident $domain:ident ]
        )*
    ) => {
        /// A Hop search that returns a Url to redirect to.
        fn extract(url: &str) -> Option<String> {
            $( // Commands
                match $hopper::<$domain>::extract(url) {
                    Some(url) => return Some(url),
                    None => (),
                }
            )*
            None
        }
    }
}
