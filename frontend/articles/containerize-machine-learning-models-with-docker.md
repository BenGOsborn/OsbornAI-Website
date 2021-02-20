---
title: How to containerize machine learning models using Docker
description: This article demonstrates how you can containerize any machine learning or deep learning model using Docker.
author: OsbornAI
author_social: https://twitter.com/BenOsbornAI
date_published: 20/02/2021 
keywords: docker, containerizing, tensorflow, machine learning, how to containerize a machine learning model, how to, deployment, environment, deep learning, consistent
---

![Aerial View Photography of Container Van Lot](https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260)

<br />

### Introduction:
Who would of thought that being able to bundle up your model into an environment that can be run on any computer without need for excess installations would be so useful? But surely that sounds way too good to be true, right? Wrong! Containerizing applications has become extremely popular within recent years, with no exception to the big data, machine learning and deep learning industry, which take advantage of this new technology to its fullest potential. 

<br />

In this article you're going to learn what is containerization, how it can make your life easier, what is Docker, as well as a simple example demonstrating how to containerize a TensorFlow and Flask API using Docker.

<br />

### What is containerization and why it is useful:
As stated earlier, containerization is essentially the process of bundling together a project and its environment into virtual runtime environments which can then be deployed wherever and will run exactly according to how the environment was set up. 

<br />

A container is essentially a miniature virtual server that contains all of the tools required to run your code. Ok, but why is that useful? Containers provide a simple way of sharing code with others without the need for them to set up their environment to run that code. This means that your code can now be run on almost any computer in the world that is able to run that container without the need for excess set up. You won't have to be on the phone to clients for four hours trying to fix the code that as you explained worked perfectly on your computer, only to realize that they had Python 3.7 installed opposed to Python version 3.8 which you designed the app to work for, which is going to save you excess time, frustration, and a damaged reputation over such a small little problem!
