package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	// Input a list of numbers from a text file and
	// output how many times the value increases
	println(countIncreases("input.txt"))
}

// countIncreases inputs a list of numbers from a text file and
// output how many times the value increases
func countIncreases(filename string) int {
	// Open the file for reading
	file, err := os.Open(filename)
	if err != nil {
		fmt.Println(err)
		return 0
	}
	defer file.Close()

	// Read the file into a slice of ints
	var numbers []int
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		n, err := strconv.Atoi(scanner.Text())
		if err != nil {
			return 0
		}
		numbers = append(numbers, n)
	}

	// Count the increases
	count := 0
	for i := 1; i < len(numbers); i++ {
		if numbers[i] > numbers[i-1] {
			count++
		}
	}

	return count
}
