import matplotlib.pyplot as plt
import numpy as np

def g(x, t):
    return x * (t - x)

t = 30  # example value of t

x_values = np.linspace(0, t, 100)
g_values = g(x_values, t)
g_values_symmetric = g(t - x_values, t)

plt.plot(x_values, g_values, label='g(x)')
plt.plot(x_values, g_values_symmetric, label='g(t - x)')
plt.axvline(t / 2, color='r', linestyle='--', label='Symmetry Line (t/2)')
plt.xlabel('x')
plt.ylabel('g(x)')
plt.legend()
plt.title('Symmetry of g(x) and g(t - x)')
plt.show()