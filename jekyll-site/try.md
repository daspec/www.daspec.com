---
layout: page
title: Try DaSpec in your browser
excerpt: Demo examples for DaSpec
---

# Try DaSpec in your browser

Key DaSpec syntax examples work directly in your browser. Here is a list of things you can try out immediately, and peek
below the covers to see the example documents and source code:

## Start here

{% for page in site.pages %}
  {% if page.categories contains 'hello' %}
* [{{page.title | capitalize}}]({{page.url}})
  {% endif %}
{% endfor %}

## Basic Examples

{% for page in site.pages %}
  {% if page.categories contains 'basic' %}
* [{{page.title | capitalize}}]({{page.url}})
  {% endif %}
{% endfor %}

## Advanced tricks

{% for page in site.pages %}
  {% if page.categories contains 'advanced' %}
    <div class="item">
      <h3>{{page.title}}</h3>
      <p>{{page.description}}</p>  
    </div>
  {% endif %}
{% endfor %}

TBD
