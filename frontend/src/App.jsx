import { useEffect, useState } from 'react'
import api from './api/axios'
import './index.css'

function App() {

  // =========================================================
  // STATE
  // =========================================================

  const [tickets, setTickets] = useState([])

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    status: 'OPEN',
    requesterName: ''
  })

  const [editingId, setEditingId] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')

  const [selectedTicket, setSelectedTicket] = useState(null)

  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  const [loading, setLoading] = useState(false)


  // =========================================================
  // LOAD TICKETS
  // =========================================================

  useEffect(() => {
    fetchTickets()
  }, [])


  const fetchTickets = async () => {

    try {

      setLoading(true)

      const response = await api.get('/tickets')

      setTickets(response.data)

    } catch (error) {

      showMessage(
          'Unable to load tickets.',
          'error'
      )

    } finally {

      setLoading(false)
    }
  }


  // =========================================================
  // MESSAGE
  // =========================================================

  const showMessage = (text, type = 'success') => {

    setMessage(text)
    setMessageType(type)

    setTimeout(() => {
      setMessage('')
    }, 3000)
  }


  // =========================================================
  // FORM INPUT
  // =========================================================

  const handleChange = (event) => {

    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value
    })
  }


  // =========================================================
  // CREATE / UPDATE TICKET
  // =========================================================

  const handleSubmit = async (event) => {

    event.preventDefault()

    try {

      if (editingId) {

        const response = await api.put(
            `/tickets/${editingId}`,
            formData
        )

        setTickets(
            tickets.map(ticket =>
                ticket.id === editingId
                    ? response.data
                    : ticket
            )
        )

        showMessage(
            'Ticket updated successfully.'
        )

      } else {

        const response = await api.post(
            '/tickets',
            formData
        )

        setTickets([
          ...tickets,
          response.data
        ])

        showMessage(
            'Ticket created successfully.'
        )
      }

      resetForm()

    } catch (error) {

      showMessage(
          'Unable to save ticket.',
          'error'
      )
    }
  }


  // =========================================================
  // RESET FORM
  // =========================================================

  const resetForm = () => {

    setFormData({
      title: '',
      description: '',
      priority: 'MEDIUM',
      status: 'OPEN',
      requesterName: ''
    })

    setEditingId(null)
  }


  // =========================================================
  // EDIT TICKET
  // =========================================================

  const handleEdit = (ticket) => {

    setEditingId(ticket.id)

    setFormData({
      title: ticket.title || '',
      description: ticket.description || '',
      priority: ticket.priority || 'MEDIUM',
      status: ticket.status || 'OPEN',
      requesterName: ticket.requesterName || ''
    })

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }


  // =========================================================
  // DELETE TICKET
  // =========================================================

  const handleDelete = async (id) => {

    const confirmed = window.confirm(
        'Are you sure you want to delete this ticket?'
    )

    if (!confirmed) {
      return
    }

    try {

      await api.delete(`/tickets/${id}`)

      setTickets(
          tickets.filter(ticket =>
              ticket.id !== id
          )
      )

      if (selectedTicket?.id === id) {
        setSelectedTicket(null)
      }

      showMessage(
          'Ticket deleted successfully.'
      )

    } catch (error) {

      showMessage(
          'Unable to delete ticket.',
          'error'
      )
    }
  }


  // =========================================================
  // QUICK STATUS UPDATE
  // =========================================================

  const handleStatusChange = async (ticket, newStatus) => {

    try {

      const updatedTicket = {
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority,
        status: newStatus,
        requesterName: ticket.requesterName
      }

      const response = await api.put(
          `/tickets/${ticket.id}`,
          updatedTicket
      )

      setTickets(
          tickets.map(item =>
              item.id === ticket.id
                  ? response.data
                  : item
          )
      )

      if (
          selectedTicket &&
          selectedTicket.id === ticket.id
      ) {

        setSelectedTicket(response.data)
      }

      showMessage(
          'Ticket status updated successfully.'
      )

    } catch (error) {

      showMessage(
          'Unable to update ticket status.',
          'error'
      )
    }
  }


  // =========================================================
  // FILTER TICKETS
  // =========================================================

  const filteredTickets = tickets.filter(ticket => {

    const matchesSearch =
        ticket.title
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||

        ticket.requesterName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())

    const matchesStatus =
        statusFilter === '' ||
        ticket.status === statusFilter

    const matchesPriority =
        priorityFilter === '' ||
        ticket.priority === priorityFilter

    return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
    )
  })


  // =========================================================
  // CLEAR FILTERS
  // =========================================================

  const clearFilters = () => {

    setSearchTerm('')
    setStatusFilter('')
    setPriorityFilter('')
  }


  // =========================================================
  // DASHBOARD COUNTS
  // =========================================================

  const totalTickets = tickets.length

  const openTickets = tickets.filter(
      ticket => ticket.status === 'OPEN'
  ).length

  const inProgressTickets = tickets.filter(
      ticket => ticket.status === 'IN_PROGRESS'
  ).length

  const resolvedTickets = tickets.filter(
      ticket => ticket.status === 'RESOLVED'
  ).length

  const closedTickets = tickets.filter(
      ticket => ticket.status === 'CLOSED'
  ).length

  const urgentTickets = tickets.filter(
      ticket => ticket.priority === 'URGENT'
  ).length

  const highPriorityTickets = tickets.filter(
      ticket => ticket.priority === 'HIGH'
  ).length


  // =========================================================
  // PRIORITY CLASS
  // =========================================================

  const getPriorityClass = (priority) => {

    switch (priority) {

      case 'URGENT':
        return 'priority-urgent'

      case 'HIGH':
        return 'priority-high'

      case 'MEDIUM':
        return 'priority-medium'

      case 'LOW':
        return 'priority-low'

      default:
        return ''
    }
  }


  // =========================================================
  // STATUS CLASS
  // =========================================================

  const getStatusClass = (status) => {

    switch (status) {

      case 'OPEN':
        return 'status-open'

      case 'IN_PROGRESS':
        return 'status-progress'

      case 'RESOLVED':
        return 'status-resolved'

      case 'CLOSED':
        return 'status-closed'

      default:
        return ''
    }
  }


  // =========================================================
  // FORMAT STATUS
  // =========================================================

  const formatStatus = (status) => {

    if (!status) {
      return ''
    }

    return status
        .replace('_', ' ')
        .toLowerCase()
        .replace(/\b\w/g, letter =>
            letter.toUpperCase()
        )
  }


  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {

    if (!date) {
      return 'N/A'
    }

    return new Date(date).toLocaleString()
  }


  // =========================================================
  // USER INTERFACE
  // =========================================================

  return (

      <div className="app">

        {/* =================================================
                HEADER
            ================================================= */}

        <header className="header">

          <div>

            <div className="header-badge">
              MNTUNGWA HOLDINGS
            </div>

            <h1>
              Mntungwa ServiceDesk
            </h1>

            <p>
              IT Support Ticket Management
            </p>

          </div>

        </header>


        {/* =================================================
                MESSAGE
            ================================================= */}

        {message && (

            <div className={`message ${messageType}`}>

              {message}

            </div>

        )}


        {/* =================================================
                DASHBOARD
            ================================================= */}

        <section className="stats">

          <div className="stat-card">

            <div className="stat-number">
              {totalTickets}
            </div>

            <div className="stat-label">
              Total Tickets
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-number">
              {openTickets}
            </div>

            <div className="stat-label">
              Open
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-number">
              {inProgressTickets}
            </div>

            <div className="stat-label">
              In Progress
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-number">
              {resolvedTickets}
            </div>

            <div className="stat-label">
              Resolved
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-number">
              {closedTickets}
            </div>

            <div className="stat-label">
              Closed
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-number">
              {urgentTickets}
            </div>

            <div className="stat-label">
              Urgent
            </div>

          </div>


          <div className="stat-card">

            <div className="stat-number">
              {highPriorityTickets}
            </div>

            <div className="stat-label">
              High Priority
            </div>

          </div>

        </section>


        <main className="main-content">


          {/* =================================================
                    CREATE / EDIT FORM
                ================================================= */}

          <section className="form-card">

            <div className="section-header">

              <h2>
                {editingId
                    ? 'Edit Ticket'
                    : 'Create New Ticket'}
              </h2>

            </div>


            <form onSubmit={handleSubmit}>

              <div className="form-group">

                <label>
                  Ticket Title
                </label>

                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter ticket title"
                    required
                />

              </div>


              <div className="form-group">

                <label>
                  Requester Name
                </label>

                <input
                    type="text"
                    name="requesterName"
                    value={formData.requesterName}
                    onChange={handleChange}
                    placeholder="Enter requester name"
                />

              </div>


              <div className="form-group">

                <label>
                  Description
                </label>

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the issue"
                    rows="4"
                />

              </div>


              <div className="form-row">

                <div className="form-group">

                  <label>
                    Priority
                  </label>

                  <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      required
                  >

                    <option value="LOW">
                      Low
                    </option>

                    <option value="MEDIUM">
                      Medium
                    </option>

                    <option value="HIGH">
                      High
                    </option>

                    <option value="URGENT">
                      Urgent
                    </option>

                  </select>

                </div>


                <div className="form-group">

                  <label>
                    Status
                  </label>

                  <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                  >

                    <option value="OPEN">
                      Open
                    </option>

                    <option value="IN_PROGRESS">
                      In Progress
                    </option>

                    <option value="RESOLVED">
                      Resolved
                    </option>

                    <option value="CLOSED">
                      Closed
                    </option>

                  </select>

                </div>

              </div>


              <div className="form-actions">

                <button
                    type="submit"
                    className="primary-button"
                >
                  {editingId
                      ? 'Update Ticket'
                      : 'Create Ticket'}
                </button>


                {editingId && (

                    <button
                        type="button"
                        className="secondary-button"
                        onClick={resetForm}
                    >
                      Cancel
                    </button>

                )}

              </div>

            </form>

          </section>


          {/* =================================================
                    TICKETS SECTION
                ================================================= */}

          <section className="tickets-section">

            <div className="section-header">

              <h2>
                Support Tickets
              </h2>

              <span>
                            {filteredTickets.length} ticket(s)
                        </span>

            </div>


            {/* =================================================
                        FILTERS
                    ================================================= */}

            <div className="filters">

              <div className="filter-group">

                <label>
                  Search
                </label>

                <input
                    type="text"
                    value={searchTerm}
                    onChange={(event) =>
                        setSearchTerm(
                            event.target.value
                        )
                    }
                    placeholder="Search title or requester..."
                />

              </div>


              <div className="filter-group">

                <label>
                  Status
                </label>

                <select
                    value={statusFilter}
                    onChange={(event) =>
                        setStatusFilter(
                            event.target.value
                        )
                    }
                >

                  <option value="">
                    All Statuses
                  </option>

                  <option value="OPEN">
                    Open
                  </option>

                  <option value="IN_PROGRESS">
                    In Progress
                  </option>

                  <option value="RESOLVED">
                    Resolved
                  </option>

                  <option value="CLOSED">
                    Closed
                  </option>

                </select>

              </div>


              <div className="filter-group">

                <label>
                  Priority
                </label>

                <select
                    value={priorityFilter}
                    onChange={(event) =>
                        setPriorityFilter(
                            event.target.value
                        )
                    }
                >

                  <option value="">
                    All Priorities
                  </option>

                  <option value="LOW">
                    Low
                  </option>

                  <option value="MEDIUM">
                    Medium
                  </option>

                  <option value="HIGH">
                    High
                  </option>

                  <option value="URGENT">
                    Urgent
                  </option>

                </select>

              </div>


              <button
                  type="button"
                  className="secondary-button"
                  onClick={clearFilters}
              >
                Clear Filters
              </button>

            </div>


            {/* =================================================
                        TICKET LIST
                    ================================================= */}

            {loading ? (

                <div className="empty-state">
                  Loading tickets...
                </div>

            ) : filteredTickets.length === 0 ? (

                <div className="empty-state">
                  No tickets found.
                </div>

            ) : (

                <div className="ticket-list">

                  {filteredTickets.map(ticket => (

                      <div
                          className="ticket-card"
                          key={ticket.id}
                      >

                        <div className="ticket-main">

                          <div className="ticket-header">

                            <h3>
                              {ticket.title}
                            </h3>

                            <span>
                                                #{ticket.id}
                                            </span>

                          </div>


                          <p className="ticket-description">

                            {ticket.description ||
                                'No description provided.'}

                          </p>


                          <div className="ticket-meta">

                                            <span>
                                                <strong>
                                                    Requester:
                                                </strong>{' '}
                                              {ticket.requesterName ||
                                                  'N/A'}
                                            </span>


                            <span
                                className={`badge ${getPriorityClass(
                                    ticket.priority
                                )}`}
                            >
                                                {ticket.priority}
                                            </span>


                            <span
                                className={`badge ${getStatusClass(
                                    ticket.status
                                )}`}
                            >
                                                {formatStatus(
                                                    ticket.status
                                                )}
                                            </span>

                          </div>

                        </div>


                        <div className="ticket-actions">

                          {/* QUICK STATUS */}

                          <div className="quick-status">

                            <label>
                              Quick Status
                            </label>

                            <select
                                value={
                                  ticket.status
                                }
                                onChange={(event) =>
                                    handleStatusChange(
                                        ticket,
                                        event.target.value
                                    )
                                }
                            >

                              <option value="OPEN">
                                Open
                              </option>

                              <option value="IN_PROGRESS">
                                In Progress
                              </option>

                              <option value="RESOLVED">
                                Resolved
                              </option>

                              <option value="CLOSED">
                                Closed
                              </option>

                            </select>

                          </div>


                          <button
                              type="button"
                              className="secondary-button"
                              onClick={() =>
                                  setSelectedTicket(
                                      ticket
                                  )
                              }
                          >
                            View
                          </button>


                          <button
                              type="button"
                              className="secondary-button"
                              onClick={() =>
                                  handleEdit(ticket)
                              }
                          >
                            Edit
                          </button>


                          <button
                              type="button"
                              className="danger-button"
                              onClick={() =>
                                  handleDelete(
                                      ticket.id
                                  )
                              }
                          >
                            Delete
                          </button>

                        </div>

                      </div>

                  ))}

                </div>

            )}

          </section>


          {/* =================================================
                    TICKET DETAILS
                ================================================= */}

          {selectedTicket && (

              <section className="ticket-details">

                <div className="section-header">

                  <h2>
                    Ticket Details
                  </h2>

                  <button
                      type="button"
                      className="secondary-button"
                      onClick={() =>
                          setSelectedTicket(null)
                      }
                  >
                    Close
                  </button>

                </div>


                <div className="details-grid">

                  <div>

                    <strong>
                      Title
                    </strong>

                    <p>
                      {selectedTicket.title}
                    </p>

                  </div>


                  <div>

                    <strong>
                      Description
                    </strong>

                    <p>
                      {selectedTicket.description ||
                          'No description provided.'}
                    </p>

                  </div>


                  <div>

                    <strong>
                      Requester
                    </strong>

                    <p>
                      {selectedTicket.requesterName ||
                          'N/A'}
                    </p>

                  </div>


                  <div>

                    <strong>
                      Priority
                    </strong>

                    <p>
                      {selectedTicket.priority}
                    </p>

                  </div>


                  <div>

                    <strong>
                      Status
                    </strong>

                    <p>
                      {formatStatus(
                          selectedTicket.status
                      )}
                    </p>

                  </div>


                  <div>

                    <strong>
                      Created
                    </strong>

                    <p>
                      {formatDate(
                          selectedTicket.createdAt
                      )}
                    </p>

                  </div>

                </div>

              </section>

          )}

        </main>

      </div>
  )
}

export default App