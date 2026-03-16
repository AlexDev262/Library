# 📚 The Smart Library

This project is a compact library manager designed to store and display book data through an interactive interface. It was built primarily to practice efficient object-oriented patterns and handle dynamic UI constraints.

## Features
* **Interactive Book Creation:** Use a built-in form to add books with specific details including Title, Author, Page count, and "Read" status.
* **Dynamic Library Storage:** All generated books are stored in a centralized library and rendered as tactile cards.
* **3D Flip Interactions:** Hover over any book card to flip it, revealing its metadata and management options.
* **Live Status Updates:** Toggle the "Read" status of any book directly from the back of the card.
* **Library Management:** Easily remove books from your collection using the delete feature, which updates the library state in real-time.
* **Responsive Capacity Logic:** The interface understands its own limits, automatically disabling the creation of new books when the library container is full based on your current screen size.

## Technical Details
The architecture of this project focuses on memory efficiency by utilizing **Prototypes**. Instead of each book object carrying its own copy of the methods, all books share a single prototype for functions like status updates. This ensures that the application remains lightweight even as the library grows.

On the UI side, the project implements a **Spatial Awareness** feature. By calculating the available real estate of the library container based on the user's viewport (accounting for `vh` units, padding, and gaps), the program determines exactly how many books can fit. If the library reaches capacity, the creation button is disabled to prevent layout overflow, ensuring a consistent user experience regardless of device size.
