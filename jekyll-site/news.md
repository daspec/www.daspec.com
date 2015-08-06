---
layout: page
title: Latest News
---
# Latest News

Subscribe using [RSS]({{ "/feed.xml" | prepend: site.baseurl }}) or follow [@{{site.twitter_username}}](https://twitter.com/{{site.twitter_username}}) on Twitter.

{% for post in site.posts limit:20 %}  
* {{ post.date | date_to_string }} [{{post.title}}]({{ BASE_PATH }}{{ post.url }})
{% endfor %}  
