import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import Compte from '../compte'
import { UserProvider } from '../../../contexte/UserContext'
import axios from 'axios'

vi.mock('axios')

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('../../navBar/menuBurger', () => ({
  default: () => <div data-testid="header">Header</div>
}))

const mockUser = {
  pseudo: 'TestUser',
  email: 'test@test.com',
  userId: 1,
  role: 'user',
  token: 'fake-token'
}

const mockUpdateUser = vi.fn()
const mockLogOut = vi.fn()

vi.mock('../../../contexte/UserContext', () => ({
  useUser: () => ({
    user: mockUser,
    updateUser: mockUpdateUser,
    logOut: mockLogOut
  })
}))

const TestWrapper = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
)

describe('Compte Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('affiche les informations utilisateur', () => {
    render(<Compte />, { wrapper: TestWrapper })
    
    expect(screen.getByText('Mon Compte')).toBeInTheDocument()
    expect(screen.getByText('Informations personnelles')).toBeInTheDocument()
    expect(screen.getByText('TestUser')).toBeInTheDocument()
    expect(screen.getByText('test@test.com')).toBeInTheDocument()
  })

  test('permet de basculer en mode édition', async () => {
    render(<Compte />, { wrapper: TestWrapper })
    
    const editButton = screen.getByText('Modifier')
    fireEvent.click(editButton)
    
    await waitFor(() => {
      expect(screen.getByText('Sauvegarder')).toBeInTheDocument()
      expect(screen.getByText('Annuler')).toBeInTheDocument()
    })
  })

  test('affiche le modal de confirmation pour supprimer le compte', async () => {
    render(<Compte />, { wrapper: TestWrapper })
    
    const deleteButton = screen.getByText('Supprimer le compte')
    fireEvent.click(deleteButton)
    
    await waitFor(() => {
      expect(screen.getByText('⚠️ Supprimer le compte')).toBeInTheDocument()
      expect(screen.getByText('Oui, supprimer')).toBeInTheDocument()
      expect(screen.getByText('Annuler')).toBeInTheDocument()
    })
  })

  test('charge les publications utilisateur', async () => {
    const mockPosts = [
      {
        idPost: 1,
        title: 'Mon premier post',
        description: 'Description du post',
        datePublication: '2024-01-01',
        pseudo: 'TestUser'
      }
    ]

    axios.get.mockResolvedValueOnce({
      data: { data: mockPosts }
    })

    render(<Compte />, { wrapper: TestWrapper })
    
    const postsButton = screen.getByText('Mes publications')
    fireEvent.click(postsButton)

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('/api/post')
      )
    })
  })
})