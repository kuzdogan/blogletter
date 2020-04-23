# Journal
Here I will be documenting my process and aggregating useful resources I've found while I'm writing this service. 
Why? For both my later reference and journaling my development process.
And in case someone will get inspired by this, encounters same problems, and needs some background

# Why I'm building this
I am a big fan of newsletters. I generally open them before I start my day, scan through the articles, read the ones I've interesting or save them for later. 
Even if I don't read any of them, titles give enough information I need most of the times.

When I get interested in a field I generally subscribe to few of them, then remove the ones whose infromation/content ratio is low.
So I remove the noise, and be left with the most condense information providers.

However, the most valuable information is usually not in form of newsletters. 
One of the best ways to learn is to read the _stream of conciousness_ of great minds. 
If the subject is blockchain, such a (controversial) person is Nick Szabo who's been writing a blog [Unenumerated](https://unenumerated.blogspot.com/).

I've long had the goal to start reading his blog from the start, which *of course* I never did. Who does that?

So one day I came up with the idea of scanning through all the articles of a blog and receive them regularly as a newsletter in my inbox.
As Szabo is hosting his blog at Blogger, the first step is to integrate Blogger blogs. Which makes things easier thanks to their [API](https://developers.google.com/blogger/docs/2.0/reference).

# Resources and Development Process

Here I plan to document the problems I encountered and save the resources I found when writing. 
This is mostly because I couldn't find the really useful article that explains how to do OAuth for Twitter API to get access tokens in my [twitterbot repo](https://github.com/kuzdogan/twitterbot).
So, hope this will also help others solving similar problems.

### Problem: How to get all posts of a blog
I first thought about using rss feeds of a blog. It seems they only return most recent items by default.
However, the [Blogger API](https://developers.google.com/gdata/docs/2.0/basics) which makes use of the [Google Data API](https://developers.google.com/gdata/docs/2.0/basics) has nice set of parameters that can be passed as queries.
Such as `max-results`. It takes a maximum value of 500. [Here](https://too-clever-by-half.blogspot.com/2011/12/blog-feed-500-post-limit-for-more-than.html) is explained how to handle the situation wiht more than 500 items.
Plus it supports returning json so no need for XML shit.

### Problem: How to make the frontend? 
Should I use server side rendering for SEO? Should I just do plain HTML/JS/CSS? Maybe React + Next.js? 

Just do whatever works for you. For me react would be the easiest I guess.