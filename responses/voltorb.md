# Hisui's New Power Plant

## Prompt

> "The Galaxy Team has decided that in order to advance the research on Pokemon and the Pokedex, Jubilife village needs a brand new power plant. Luckily, Professor Laventon has discovered that the Pokemon, Voltorb, is the best candidate to help power the village.

> Voltorbs can cleanly and efficiently produce electricity. An average Voltorb is about 0.5m (1'08") tall and weighs 10.4 kg (22.8lbs). However, they are uncommon and are only found in the Sacred Plaza.

> Objective: How many Voltorbs will you need to catch to fully power the village. Describe each step in your thought process.”

## My Process

1. First, I’ll research whether the Voltorbs will be treated humanely and that this isn’t a Team Rocket trick before I partake in this venture.

2. Then, I’ll find out how much electricity is needed to power the entire village.

    ```
    e = electricity needed to power the whole village
    ```

3. Next, I’ll find out how much electricity the other power plants are currently producing. The question implies there’s at least one other power plant but it’s uncertain if there’s more than one.

    ```
    p(1, 2, …) = current electricity production for a power plant
    ```

4. I can then find out how much electricity the new power plant needs to produce to power the village by subtracting the amount of electricity currently being produced from the total electricity needed.

	```
    n = e - (p1 + p2 + …)
	n = electricity the new power plant needs to produce
    ```

5. From my research on Bulbapedia, it’s not known how Voltorbs produce electricity. So I’ll infer how much electricity a single Voltorb can produce by the electricity production at current power plants.

    ```
	v(1, 2, …) = number of Voltorbs at a power plant
	a = p1 / v1
	a = average Voltorb electricity production at a power plant
    ```

6. I’ll find the average electricity production of a single Voltorb by averaging out the average Voltorb electricity production at each power plant.

    ```
	y = ((a1 + a2 + …) / total number of current power plants)
	y = average electricity production of a single Voltorb
    ```

7. Then to find approximately how many Voltorbs are needed to power the village, it’s simply the amount of electricity the new power plant needs to produce divided by the average electricity production of a single Voltorb.

    ```
	x = n / y
	x = amount of Voltorbs needed to power the village
    ```