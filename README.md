# Restaurant Menu API Documentation
**Version:** 1.0.0  
**Last Updated:** January 2026  
**Company:** Softlien (Pvt) Ltd 
**Purpose:** Frontend Intern Technical Assessment

---

## Table of Contents
1. Introduction
2. Getting Started
3. Base URL & Authentication
4. Restaurant Information API
5. Categories API
6. Menu Items API
7. Filtering & Search
8. Pagination & Sorting
9. Error Handling
10. Code Examples
11. Testing Guide
12. Appendix

---

## 1. Introduction

This document describes the REST API endpoints for the Restaurant E-Menu application. The API provides access to restaurant information, menu categories, and menu items with advanced filtering capabilities.

**Key Features:**
- RESTful API design
- JSON response format
- No authentication required (mock server)
- CORS enabled
- 50 menu items across 4 categories

---

## 2. Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm package manager
- Terminal/Command Prompt

### Installation Steps

**Step 1: Install Dependencies**
```bash
npm install -g json-server
```

**Step 2: Start the Server**
```bash
npm run api
```

**Step 3: Verify Server is Running**
Open your browser and navigate to: 
```
http://localhost:3001
```

**Expected Output:**
The server should be running on port 3001 and display a list of available endpoints.

---

## 3. Base URL & Configuration

### Base URL
```
http://localhost:3001
```

### Headers
All requests should include: 
```
Content-Type: application/json
```

### Response Format
All responses are in JSON format.

### Server Configuration

| Configuration | Value |
|--------------|-------|
| Port | 3001 |
| Host | localhost |
| Protocol | HTTP |
| CORS | Enabled (all origins) |
| Request Delay | 0ms (configurable) |

### Alternative Server Commands

**Standard Server:**
```bash
npm run api
```

**Server with Network Access:**
```bash
npm run api:host
```

---

## 4. Restaurant Information API

### 4.1 Get Restaurant Details

Retrieve general information about the restaurant including name, contact details, and branding. 

**Endpoint:**
```
GET /restaurant
```

**Request Example:**
```bash
curl http://localhost:3001/restaurant
```

**Response (200 OK):**
```json
{
  "name": "Delicious Bites Restaurant",
  "tagline": "Experience culinary excellence",
  "description": "A modern dining experience with diverse flavors",
  "logo": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
  "phone": "+1 (555) 123-4567",
  "email": "info@deliciousbites.com"
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| name | string | Restaurant name |
| tagline | string | Restaurant tagline |
| description | string | Brief description |
| logo | string | URL to restaurant logo |
| phone | string | Contact phone number |
| email | string | Contact email address |

---

## 5. Categories API

### 5.1 Get All Categories

Retrieve all available menu categories.

**Endpoint:**
```
GET /categories
```

**Request Example:**
```bash
curl http://localhost:3001/categories
```

**Response (200 OK):**
```json
[
  {
    "id": "appetizers",
    "name":  "Appetizers",
    "icon": "🥗",
    "description": "Start your meal right"
  },
  {
    "id": "mains",
    "name": "Main Course",
    "icon": "🍽️",
    "description": "Hearty and satisfying"
  },
  {
    "id": "desserts",
    "name": "Desserts",
    "icon": "🍰",
    "description": "Sweet endings"
  },
  {
    "id": "beverages",
    "name": "Beverages",
    "icon": "🥤",
    "description": "Refresh yourself"
  }
]
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique category identifier |
| name | string | Display name of category |
| icon | string | Emoji icon for category |
| description | string | Category description |

### 5.2 Get Single Category

Retrieve a specific category by ID.

**Endpoint:**
```
GET /categories/{categoryId}
```

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| categoryId | string | Yes | Category ID (appetizers, mains, desserts, beverages) |

**Request Example:**
```bash
curl http://localhost:3001/categories/appetizers
```

**Response (200 OK):**
```json
{
  "id": "appetizers",
  "name": "Appetizers",
  "icon": "🥗",
  "description": "Start your meal right"
}
```

---

## 6. Menu Items API

### 6.1 Get All Menu Items

Retrieve all menu items (50 items total).

**Endpoint:**
```
GET /menuItems
```

**Request Example:**
```bash
curl http://localhost:3001/menuItems
```

**Response (200 OK):**
Returns an array of menu item objects.

**Sample Menu Item:**
```json
{
  "id": "1",
  "name": "Caesar Salad",
  "description": "Fresh romaine lettuce with parmesan cheese, croutons, and homemade Caesar dressing",
  "price":  8.99,
  "category": "appetizers",
  "image": "https://images.unsplash.com/photo-1546793665-c74683f339c1",
  "dietary": ["vegetarian"],
  "popular": true,
  "spicyLevel": 0,
  "preparationTime": 10
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique item identifier |
| name | string | Item name |
| description | string | Full item description |
| price | number | Price in USD |
| category | string | Category ID |
| image | string | URL to item image |
| dietary | array | Dietary tags (vegetarian, vegan, gluten-free) |
| popular | boolean | Is this a popular item? |
| spicyLevel | number | Spice level (0-3) |
| preparationTime | number | Preparation time in minutes |

### 6.2 Get Single Menu Item

Retrieve a specific menu item by ID.

**Endpoint:**
```
GET /menuItems/{id}
```

**Path Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | Menu item ID (1-50) |

**Request Example:**
```bash
curl http://localhost:3001/menuItems/1
```

**Response (200 OK):**
Returns a single menu item object.

**Error Response (404 Not Found):**
```json
{}
```

---

## 7. Filtering & Search

### 7.1 Filter by Category

Get all items in a specific category.

**Endpoint:**
```
GET /menuItems?category={categoryId}
```

**Query Parameters:**

| Parameter | Type | Required | Values |
|-----------|------|----------|--------|
| category | string | No | appetizers, mains, desserts, beverages |

**Examples:**

**Get All Appetizers:**
```bash
curl http://localhost:3001/menuItems?category=appetizers
```

**Get All Main Courses:**
```bash
curl http://localhost:3001/menuItems?category=mains
```

**Get All Desserts:**
```bash
curl http://localhost:3001/menuItems?category=desserts
```

**Get All Beverages:**
```bash
curl http://localhost:3001/menuItems?category=beverages
```

### 7.2 Filter by Popular Items

Get only popular menu items.

**Endpoint:**
```
GET /menuItems?popular=true
```

**Query Parameters:**

| Parameter | Type | Required | Values |
|-----------|------|----------|--------|
| popular | boolean | No | true, false |

**Request Example:**
```bash
curl http://localhost:3001/menuItems?popular=true
```

### 7.3 Filter by Dietary Preferences

Get items by dietary restrictions.

**Endpoint:**
```
GET /menuItems?dietary_like={dietaryType}
```

**Query Parameters:**

| Parameter | Type | Required | Values |
|-----------|------|----------|--------|
| dietary_like | string | No | vegetarian, vegan, gluten-free |

**Examples:**

**Get Vegetarian Items:**
```bash
curl http://localhost:3001/menuItems?dietary_like=vegetarian
```

**Get Vegan Items:**
```bash
curl http://localhost:3001/menuItems?dietary_like=vegan
```

**Get Gluten-Free Items:**
```bash
curl http://localhost:3001/menuItems?dietary_like=gluten-free
```

### 7.4 Filter by Spicy Level

Get items by spice level.

**Endpoint:**
```
GET /menuItems?spicyLevel={level}
```

**Spicy Level Values:**

| Level | Description |
|-------|-------------|
| 0 | No spice |
| 1 | Mild |
| 2 | Medium |
| 3 | Hot/Spicy |

**Examples:**

**Get Non-Spicy Items:**
```bash
curl http://localhost:3001/menuItems?spicyLevel=0
```

**Get Spicy Items:**
```bash
curl http://localhost:3001/menuItems?spicyLevel=3
```

### 7.5 Filter by Price Range

Get items within a specific price range.

**Endpoint:**
```
GET /menuItems?price_gte={min}&price_lte={max}
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| price_gte | number | Price greater than or equal to |
| price_lte | number | Price less than or equal to |

**Examples:**

**Items Under $10:**
```bash
curl http://localhost:3001/menuItems?price_lte=10
```

**Items Between $10-$20:**
```bash
curl http://localhost:3001/menuItems?price_gte=10&price_lte=20
```

**Items Over $20:**
```bash
curl http://localhost:3001/menuItems?price_gte=20
```

### 7.6 Full-Text Search

Search across item names and descriptions.

**Endpoint:**
```
GET /menuItems?q={searchTerm}
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| q | string | Search term (case-insensitive) |

**Examples:**

**Search for "chicken":**
```bash
curl http://localhost:3001/menuItems?q=chicken
```

**Search for "pasta":**
```bash
curl http://localhost:3001/menuItems?q=pasta
```

**Search for "chocolate":**
```bash
curl http://localhost:3001/menuItems?q=chocolate
```

### 7.7 Multiple Filters (Combined)

You can combine multiple filters in a single request.

**Endpoint:**
```
GET /menuItems?param1=value1&param2=value2&param3=value3
```

**Examples:**

**Popular Appetizers Under $10:**
```bash
curl "http://localhost:3001/menuItems?category=appetizers&popular=true&price_lte=10"
```

**Vegetarian Main Courses:**
```bash
curl "http://localhost:3001/menuItems?category=mains&dietary_like=vegetarian"
```

**Non-Spicy Desserts:**
```bash
curl "http://localhost:3001/menuItems?category=desserts&spicyLevel=0"
```

**Vegan Items Under $15:**
```bash
curl "http://localhost:3001/menuItems?dietary_like=vegan&price_lte=15"
```

---

## 8. Pagination & Sorting

### 8.1 Pagination

Paginate large result sets for better performance.

**Endpoint:**
```
GET /menuItems?_page={page}&_limit={limit}
```

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| _page | number | 1 | Page number (starts at 1) |
| _limit | number | all | Items per page |

**Examples:**

**First 10 Items (Page 1):**
```bash
curl http://localhost:3001/menuItems?_page=1&_limit=10
```

**Next 10 Items (Page 2):**
```bash
curl http://localhost:3001/menuItems?_page=2&_limit=10
```

**Items 21-30 (Page 3):**
```bash
curl http://localhost:3001/menuItems?_page=3&_limit=10
```

**Response Headers:**

The server includes pagination information in response headers: 

```
X-Total-Count: 50
Link: <http://localhost:3001/menuItems?_page=2&_limit=10>; rel="next"
```

### 8.2 Sorting

Sort results by any field.

**Endpoint:**
```
GET /menuItems?_sort={field}&_order={direction}
```

**Query Parameters:**

| Parameter | Type | Values | Description |
|-----------|------|--------|-------------|
| _sort | string | any field name | Field to sort by |
| _order | string | asc, desc | Sort direction |

**Sortable Fields:**
- name
- price
- preparationTime
- spicyLevel
- category
- popular

**Examples:**

**Sort by Price (Low to High):**
```bash
curl "http://localhost:3001/menuItems?_sort=price&_order=asc"
```

**Sort by Price (High to Low):**
```bash
curl "http://localhost:3001/menuItems?_sort=price&_order=desc"
```

**Sort by Name (A-Z):**
```bash
curl "http://localhost:3001/menuItems?_sort=name&_order=asc"
```

**Sort by Preparation Time:**
```bash
curl "http://localhost:3001/menuItems?_sort=preparationTime&_order=asc"
```

### 8.3 Combined Pagination & Sorting

Combine pagination with sorting. 

**Example:**

**First 10 Items Sorted by Price:**
```bash
curl "http://localhost:3001/menuItems?_page=1&_limit=10&_sort=price&_order=asc"
```

---

## 9. Error Handling

### HTTP Status Codes

| Status Code | Description | When It Occurs |
|-------------|-------------|----------------|
| 200 OK | Success | Request successful |
| 404 Not Found | Resource not found | Invalid ID or endpoint |
| 500 Internal Server Error | Server error | Server malfunction |

### Error Response Format

When an error occurs, the server may return an empty object or error message: 

```json
{}
```

Or: 

```json
{
  "error": "Not Found"
}
```

### Common Errors

**1. Invalid Item ID:**
```bash
GET /menuItems/999
```
Response: `{}` (empty object)

**2. Invalid Endpoint:**
```bash
GET /invalid-endpoint
```
Response: 404 Not Found

**3. Invalid Query Parameter:**
Invalid parameters are typically ignored, and all items are returned.

---

## 10. Code Examples

### 10.1 JavaScript (Fetch API)

**Get All Menu Items:**
```javascript
async function getAllMenuItems() {
  try {
    const response = await fetch('http://localhost:3001/menuItems');
    const items = await response.json();
    console.log(items);
    return items;
  } catch (error) {
    console.error('Error fetching menu items:', error);
  }
}
```

**Filter by Category:**
```javascript
async function getItemsByCategory(category) {
  try {
    const response = await fetch(
      `http://localhost:3001/menuItems?category=${category}`
    );
    const items = await response.json();
    return items;
  } catch (error) {
    console.error('Error fetching items:', error);
  }
}

// Usage
const appetizers = await getItemsByCategory('appetizers');
```

**Search Items:**
```javascript
async function searchItems(query) {
  try {
    const response = await fetch(
      `http://localhost:3001/menuItems?q=${encodeURIComponent(query)}`
    );
    const results = await response.json();
    return results;
  } catch (error) {
    console.error('Error searching items:', error);
  }
}

// Usage
const results = await searchItems('chicken');
```

**Get Popular Items:**
```javascript
async function getPopularItems() {
  try {
    const response = await fetch(
      'http://localhost:3001/menuItems?popular=true'
    );
    const items = await response.json();
    return items;
  } catch (error) {
    console.error('Error fetching popular items:', error);
  }
}
```

**Filter with Multiple Parameters:**
```javascript
async function getFilteredItems(filters) {
  try {
    const params = new URLSearchParams(filters);
    const response = await fetch(
      `http://localhost:3001/menuItems?${params. toString()}`
    );
    const items = await response.json();
    return items;
  } catch (error) {
    console.error('Error fetching filtered items:', error);
  }
}

// Usage
const items = await getFilteredItems({
  category:  'appetizers',
  popular: true,
  price_lte: 10
});
```

### 10.2 React Example

**Basic Component:**
```javascript
import { useState, useEffect } from 'react';

function MenuItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch('http://localhost:3001/menuItems');
        const data = await response. json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>${item.price}</p>
        </div>
      ))}
    </div>
  );
}
```

**With Filtering:**
```javascript
import { useState, useEffect } from 'react';

function MenuItems() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      setLoading(true);
      const url = category
        ? `http://localhost:3001/menuItems?category=${category}`
        : 'http://localhost:3001/menuItems';
      
      const response = await fetch(url);
      const data = await response.json();
      setItems(data);
      setLoading(false);
    }

    fetchItems();
  }, [category]);

  return (
    <div>
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="appetizers">Appetizers</option>
        <option value="mains">Main Course</option>
        <option value="desserts">Desserts</option>
        <option value="beverages">Beverages</option>
      </select>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {items. map(item => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <p>${item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### 10.3 Next.js Example

**API Route (pages/api/menu. js):**
```javascript
export default async function handler(req, res) {
  const { category, popular, search } = req.query;
  
  let url = 'http://localhost:3001/menuItems';
  const params = new URLSearchParams();
  
  if (category) params.append('category', category);
  if (popular) params.append('popular', popular);
  if (search) params.append('q', search);
  
  const queryString = params.toString();
  if (queryString) url += `?${queryString}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
```

**Server Component (App Router):**
```javascript
async function getMenuItems() {
  const res = await fetch('http://localhost:3001/menuItems', {
    cache: 'no-store'
  });
  return res.json();
}

export default async function MenuPage() {
  const items = await getMenuItems();

  return (
    <div>
      <h1>Menu</h1>
      {items.map(item => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>${item.price}</p>
        </div>
      ))}
    </div>
  );
}
```

### 10.4 React Query Example

```javascript
import { useQuery } from '@tanstack/react-query';

function MenuItems({ category }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['menuItems', category],
    queryFn: async () => {
      const url = category
        ? `http://localhost:3001/menuItems? category=${category}`
        : 'http://localhost:3001/menuItems';
      const response = await fetch(url);
      return response.json();
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>${item.price}</p>
        </div>
      ))}
    </div>
  );
}
```

### 10.5 Axios Example

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

// Get all items
export const getAllMenuItems = async () => {
  const response = await axios.get(`${API_BASE_URL}/menuItems`);
  return response.data;
};

// Get items by category
export const getItemsByCategory = async (category) => {
  const response = await axios. get(`${API_BASE_URL}/menuItems`, {
    params: { category }
  });
  return response. data;
};

// Search items
export const searchItems = async (query) => {
  const response = await axios.get(`${API_BASE_URL}/menuItems`, {
    params: { q:  query }
  });
  return response.data;
};

// Get filtered items
export const getFilteredItems = async (filters) => {
  const response = await axios.get(`${API_BASE_URL}/menuItems`, {
    params: filters
  });
  return response. data;
};

// Usage
const items = await getAllMenuItems();
const appetizers = await getItemsByCategory('appetizers');
const results = await searchItems('chicken');
const filtered = await getFilteredItems({
  category: 'mains',
  popular: true,
  price_lte: 20
});
```

---

## 11. Testing Guide

### 11.1 Browser Testing

**Step 1:** Start the server
```bash
npm run api
```

**Step 2:** Open these URLs in your browser: 

- http://localhost:3001/restaurant
- http://localhost:3001/categories
- http://localhost:3001/menuItems
- http://localhost:3001/menuItems?category=appetizers
- http://localhost:3001/menuItems?popular=true
- http://localhost:3001/menuItems?q=chicken

### 11.2 cURL Testing

**Test Restaurant Endpoint:**
```bash
curl http://localhost:3001/restaurant
```

**Test Categories:**
```bash
curl http://localhost:3001/categories
```

**Test Menu Items:**
```bash
curl http://localhost:3001/menuItems
```

**Test Filtering:**
```bash
curl "http://localhost:3001/menuItems?category=appetizers"
```

**Test Search:**
```bash
curl "http://localhost:3001/menuItems?q=chicken"
```

### 11.3 Postman/Thunder Client

**Import These Requests:**

1. **Get Restaurant**
   - Method: GET
   - URL: http://localhost:3001/restaurant

2. **Get All Categories**
   - Method: GET
   - URL: http://localhost:3001/categories

3. **Get All Menu Items**
   - Method:  GET
   - URL: http://localhost:3001/menuItems

4. **Get Appetizers**
   - Method: GET
   - URL: http://localhost:3001/menuItems?category=appetizers

5. **Get Popular Items**
   - Method: GET
   - URL: http://localhost:3001/menuItems?popular=true

6. **Search Items**
   - Method: GET
   - URL: http://localhost:3001/menuItems?q=chicken

7. **Filter Vegetarian**
   - Method: GET
   - URL: http://localhost:3001/menuItems?dietary_like=vegetarian

8. **Price Range**
   - Method: GET
   - URL: http://localhost:3001/menuItems?price_gte=10&price_lte=20

---

## 12. Appendix

### 12.1 Query Parameters Reference

| Parameter | Description | Example |
|-----------|-------------|---------|
| category | Filter by category | ? category=appetizers |
| popular | Filter popular items | ?popular=true |
| dietary_like | Filter by dietary type | ?dietary_like=vegetarian |
| spicyLevel | Filter by spice level | ?spicyLevel=0 |
| price_gte | Price greater/equal | ?price_gte=10 |
| price_lte | Price less/equal | ? price_lte=20 |
| q | Full-text search | ?q=chicken |
| _page | Page number | ?_page=1 |
| _limit | Items per page | ?_limit=10 |
| _sort | Sort by field | ?_sort=price |
| _order | Sort direction | ?_order=asc |

### 12.2 Category IDs

| Category ID | Display Name |
|-------------|--------------|
| appetizers | Appetizers |
| mains | Main Course |
| desserts | Desserts |
| beverages | Beverages |

### 12.3 Dietary Types

| Type | Description |
|------|-------------|
| vegetarian | Contains no meat or fish |
| vegan | Contains no animal products |
| gluten-free | Contains no gluten |

### 12.4 Spicy Levels

| Level | Description |
|-------|-------------|
| 0 | No spice |
| 1 | Mild spice |
| 2 | Medium spice |
| 3 | Hot/Very spicy |

### 12.5 Common Use Cases

**Use Case 1: Display Menu by Category**
```
GET /menuItems?category=appetizers
```

**Use Case 2: Search Functionality**
```
GET /menuItems?q={userInput}
```

**Use Case 3: Filter Dietary Preferences**
```
GET /menuItems?dietary_like=vegetarian
```

**Use Case 4: Show Popular Items**
```
GET /menuItems?popular=true
```

**Use Case 5: Price Range Filter**
```
GET /menuItems?price_gte=10&price_lte=20
```

**Use Case 6: Combined Filters**
```
GET /menuItems?category=mains&dietary_like=vegetarian&price_lte=15
```

### 12.6 Data Structure Reference

**Restaurant Object:**
```typescript
{
  name: string;
  tagline: string;
  description:  string;
  logo: string;
  phone: string;
  email: string;
}
```

**Category Object:**
```typescript
{
  id: string;
  name: string;
  icon: string;
  description: string;
}
```

**Menu Item Object:**
```typescript
{
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  dietary: string[];
  popular: boolean;
  spicyLevel: number;
  preparationTime: number;
}
```

### 12.7 Support & Resources

**Server Command Reference:**
- Start server: `npm run api`
- Start with network access: `npm run api: host`
- Start with delay: `npm run api:delay`

**Troubleshooting:**
1. Server won't start: Check if port 3001 is available
2.  CORS errors: Use `npm run api:host` for network access
3. Empty responses:  Verify data-set. json exists and is valid JSON
4. 404 errors: Check endpoint spelling and ID values

**Common Issues:**

| Issue | Solution |
|-------|----------|
| Port already in use | Kill process on port 3001 or change port |
| Cannot find module | Run `npm install` |
| Invalid JSON | Validate data-set.json format |
| CORS error | Server has CORS enabled by default |

### 12.8 Best Practices

**For Frontend Development:**
1. Always handle loading states
2. Implement error handling
3. Use proper HTTP status code checks
4. Cache responses when appropriate
5. Debounce search inputs
6. Show user-friendly error messages
7. Implement loading skeletons
8. Handle empty states gracefully

**For API Usage:**
1. Use query parameters for filtering
2. Implement pagination for large lists
3. Use search (q parameter) for user input
4. Combine filters when needed
5. Sort results for better UX
6. Cache restaurant and category data
7. Validate user input before API calls

### 12.9 Performance Tips

1. **Limit Results:** Use pagination (_page and _limit)
2. **Filter Early:** Apply filters to reduce payload size
3. **Cache Static Data:** Cache restaurant info and categories
4. **Debounce Search:** Wait for user to stop typing
5. **Use Loading States:** Show feedback during fetch
6. **Error Boundaries:** Implement error handling
7. **Optimize Images:** Use Next.js Image component

---

## Document Information

**Document Title:** Restaurant Menu API Documentation  
**Version:** 1.0.0  
**Created:** January 2026  
**Purpose:** Frontend Intern Technical Assessment  
**Company:** Softlien (Pvt) Ltd
**Contact:** info@softlien.com  

**Revision History:**

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | Jan 2026 | Initial release | Softlien Team |

---

**End of Document**

Total Pages: 25
Total Endpoints: 8
Total Examples: 50+
