import { NextResponse } from "next/server"
import { google } from "googleapis"

const SHEET_ID = "1D0pv0tieTAb3lyKqY9853FEI0BXdr0YvpOrze8qiVu8"
const RANGE = "A:Z" // Adjust this range as needed

// Service account credentials
const CREDENTIALS = {
  type: "service_account",
  project_id: "summer-drive-462209-e3",
  private_key_id: "3ff435f95abb367fa152b594d36b45b337e14449",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCjbfBR4nHJb+vx\nbD9hYn35vPbqvvw+FNeG8wG+X7B1tdxXvF5OiezT+Khbl1moBQeN+w3rOgBtIEwQ\nD6ovJoWzVRmj8Q4ygmmfY4cABaD2yCAB0i7bpo61pg7ZEvS9FLcYj0IgQMiRpXld\n5nxox4dmjIaQ73gHmTQGSIf/F2pRNIu52rFllDfz5g7IpyrbuT+9Lnu7JzuWDGRW\nWrsxZklXZpGaQjuRssXPumxe9Pg53RS/oUkxh/XPVv2fTmnuEbIImE2u8uXy8fFq\nn6/3etiDgiee8XTofDVihicB44nsarFbaPLYOOFCL6XxuYlX3jTqLf9o6kdzKjm8\noP43b8LZAgMBAAECggEAAw3xl0gzDfuhZmdaZmatudKQL1o/MuZXEmK9kjot3T9X\nRU0EGrXtdxc/R0n0fyVL6zmJXK9+dUusnEK8sKmox02kf2nIlQVWtcfJjMSuKdqa\n7YnI/io2Ydr/DUvTRurpkqQPzXREg2NbObfudJNhGpevBquxG7w/aowlvYzpm+em\nuzBUCFZv+YHvtDj+xb2VJZu6wj8dbKZaD0Ylz2e5l4O57tEUWmVwV767JWdzrT70\ndJdD6ojtLlvGvD7n+23KcpQARv4atXVdwxScbB7WH7DdkHnyLoOBCBaHWBWOP4fr\nwIBdq6vRaXv1tNBm3GruCwiWUBG/gKdDAH/FD1ILUQKBgQDVp8GWaY63VjRLFakx\ndzJwUsxnvr99aE2mlEwF9n+c5GbvA5c1D+BfGoi/87ctHUmYEtufGwSFzDjaYNex\n6WfHgUH9O0GdZF6oxB3Lx3ksoyv9xuBwtYRdNCfmeTWRMVcmoTXvhQ6nvkfqUuSC\n8ynbS1sl2w4Xuk6P9BoQsbDWaQKBgQDD0d6/daqS8PKWwcNtyHWXVlhIZd9i5Pst\nVpZvuen9/OYYgiGSYtQnZPLJd8l+XfCUuf9fkZHJj890kR7Cm3P+W+AuOrZV8iy5\nBpHhG89bChzlZzQshMDQxLtS7bNB/l2MJ4IcKX9tajmRtfTVu+AeKtO3yz3NCsHf\nE4cZL01a8QKBgA4zbEaXFYlSDX/AHNLQ3WVh23w5zXiEakTcLoFm9Ox0sfLJBk/c\nkkk/9j7r8AzrmWymNDrLDO3nuQ+qyCtnHCLCkKRIQAA6H6CQCHr28zLoVZA0m85i\nAj4/rTdAbzMLWIOUy4T0DxlPKHCGufGKQAn3ZEOL38/r7jTbQLBDX0GhAoGBAJs4\nR9YCQoSZo+Hmk6/5H2Un13ED94/frE6i/Tpw508iYY350PzFhB/6AA28+yZE9ogd\n65ToweRBL5PZ2MUwDkEIuOpMNe5ouhSsZYRH1BT5LjCVnyDO1jxmRYqVyus74xFO\n2+7Q4iZr9lhPIFUvyJaBIjPlUgavSUA3rXZELZAxAoGBAMuU+NjJo9R2AneNYh6q\n+H5tANnGFaR+iny6tLGXyVceyh5pA5LAhHUEdsFuzHc3qNEIq2nyEycB1tpAMuqw\nM4kvIAUl2ba7JqZoMzC3VTdVqmpLpJAev+nhZQZD21RPZooBdmjwTtgI3DBl6GCQ\nmd905klsm5CS8a9GUMuixdHp\n-----END PRIVATE KEY-----\n",
  client_email: "rayvimendeja@summer-drive-462209-e3.iam.gserviceaccount.com",
  client_id: "104406726980455587941",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/rayvimendeja%40summer-drive-462209-e3.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
}

export async function GET() {
  try {
    // Initialize the Google Sheets API with hardcoded credentials
    const auth = new google.auth.GoogleAuth({
      credentials: CREDENTIALS,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    })

    const sheets = google.sheets({ version: "v4", auth })

    // Fetch data from the sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    })

    const rows = response.data.values || []

    if (rows.length === 0) {
      return NextResponse.json({ headers: [], rows: [] })
    }

    // First row as headers, rest as data
    const headers = rows[0] || []
    const dataRows = rows.slice(1)

    // Ensure all rows have the same length as headers
    const normalizedRows = dataRows.map((row) => {
      const normalizedRow = [...row]
      while (normalizedRow.length < headers.length) {
        normalizedRow.push("")
      }
      return normalizedRow.slice(0, headers.length)
    })

    return NextResponse.json({
      headers,
      rows: normalizedRows,
    })
  } catch (error) {
    console.error("Error fetching sheet data:", error)

    // Return mock data for demonstration if API fails
    const mockData = {
      headers: ["Name", "Email", "Department", "Role", "Status"],
      rows: [
        ["John Doe", "john@example.com", "Engineering", "Developer", "Active"],
        ["Jane Smith", "jane@example.com", "Marketing", "Manager", "Active"],
        ["Bob Johnson", "bob@example.com", "Sales", "Representative", "Inactive"],
        ["Alice Brown", "alice@example.com", "HR", "Coordinator", "Active"],
        ["Charlie Wilson", "charlie@example.com", "Engineering", "Senior Developer", "Active"],
      ],
    }

    return NextResponse.json(mockData)
  }
}
