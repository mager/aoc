import sys
import re
from collections import defaultdict
D = open(sys.argv[1]).read().strip()
lines = D.split('\n')

p1 = 0
p2 = 0
for line in lines:
  w, y = line.split(' | ')
  _, wi = w.split(': ')
  winning = wi.split(' ')
  # Remove empty strings
  winning = list(filter(None, winning))

  yours = y.split(' ')
  yours = list(filter(None, yours))
  
  score = 0
  card_count = 0
  # Loop through all the winning numbers and check if they are in your ticket
  # If a number is found, double the score. The first point is 1, the second is 2, third is 4, etc.
  for w in winning:
    if w in yours:
      if score == 0:
        score = 1
      else:
        score = score * 2

  p1 += score
print(p1)
  
  