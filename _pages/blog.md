---
layout: page
title: blog
permalink: /blog/
description: Things I learn, work through, and explain.
nav: true
nav_order: 2
---

<div class="posts">
  {% if site.posts.size == 0 %}
    <p>No posts yet.</p>
  {% else %}
    {% for post in site.posts reversed %}
      <article class="post">
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <p class="post-meta">{{ post.date | date: "%B %-d, %Y" }}</p>
        {% if post.description %}<p>{{ post.description }}</p>{% endif %}
      </article>
    {% endfor %}
  {% endif %}
</div>
