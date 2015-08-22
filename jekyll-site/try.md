---
layout: page
title: Try DaSpec in your browser
excerpt: Demo examples for DaSpec
permalink: /examples/
---

# Try DaSpec in your browser

Here is a list of things you can try out immediately, and peek below the covers to see the example documents and source code:

## Start here

{% for page in site.pages %}
  {% if page.categories contains 'start_here' %}
* [{{page.title | capitalize}}]({{page.url}})
  {% endif %}
{% endfor %}

## Basic Examples

{% for page in site.pages %}
  {% if page.categories contains 'basic' %}
* [{{page.title | capitalize}}]({{page.url}})
  {% endif %}
{% endfor %}

## Matchers

{% for page in site.pages %}
  {% if page.categories contains 'matchers' %}
* [{{page.title | capitalize}}]({{page.url}})
  {% endif %}
{% endfor %}

