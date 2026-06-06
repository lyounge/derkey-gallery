# Monthly photo folders

- Put each month's photos in `photos/YYYY-MM/`, for example `photos/2026-06/`.
- The automation creates the current Bangkok month folder at 09:00 every day.
- Images are sorted naturally by filename and displayed as Day 1, Day 2, and so on.
- Use numbered names such as `1.jpg`, `2.jpg`, `3.jpg` to control the order.
- A month cannot contain more photos than its number of calendar days.
- Set `photoOfTheMonthDay` in that month's `month.json`, or leave it as `null`.
