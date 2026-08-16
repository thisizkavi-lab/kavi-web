---
layout: page
title: projects
permalink: /projects/
description: Small, testable projects at the boundary of protein physics and machine learning.
nav: true
nav_order: 2
display_categories: [research, software]
horizontal: false
---

<div class="projects">
{% for category in page.display_categories %}
  <a id="{{ category }}" href="#{{ category }}"><h2 class="category">{{ category }}</h2></a>
  {% assign categorized_projects = site.projects | where: "category", category %}
  {% assign sorted_projects = categorized_projects | sort: "importance" %}
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
{% endfor %}
</div>
