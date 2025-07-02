
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Users, Phone, Calendar, MoreHorizontal, Edit, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "TechCorp Ltda",
      email: "contato@techcorp.com",
      phone: "+55 11 99999-0001",
      lines: 3,
      status: "Ativo",
      created: "2024-01-15",
      lastActivity: "2024-01-20"
    },
    {
      id: 2,
      name: "Marketing Digital Plus",
      email: "admin@mdplus.com.br",
      phone: "+55 11 99999-0002",
      lines: 2,
      status: "Ativo",
      created: "2024-01-10",
      lastActivity: "2024-01-19"
    },
    {
      id: 3,
      name: "E-commerce Solutions",
      email: "suporte@ecommerce.com",
      phone: "+55 11 99999-0003",
      lines: 1,
      status: "Inativo",
      created: "2024-01-05",
      lastActivity: "2024-01-18"
    }
  ]);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalLines = clients.reduce((sum, client) => sum + client.lines, 0);
  const activeClients = clients.filter(client => client.status === "Ativo").length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-600">Gerencie clientes e suas linhas WhatsApp</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>Adicionar Cliente</DialogTitle>
              <DialogDescription>
                Crie um novo cliente para gerenciar suas linhas WhatsApp
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome da Empresa</Label>
                <Input id="name" placeholder="Ex: Empresa XYZ Ltda" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" placeholder="contato@empresa.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" placeholder="+55 11 99999-9999" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline">Cancelar</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Criar Cliente</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Clientes</p>
                <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Clientes Ativos</p>
                <p className="text-2xl font-bold text-gray-900">{activeClients}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Linhas</p>
                <p className="text-2xl font-bold text-gray-900">{totalLines}</p>
              </div>
              <Phone className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Lista de Clientes</CardTitle>
              <CardDescription>Todos os clientes cadastrados na plataforma</CardDescription>
            </div>
            <div className="w-72">
              <Input
                placeholder="Buscar por nome ou e-mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Linhas</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Criado em</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{client.name}</p>
                      <p className="text-sm text-gray-500">ID: {client.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-gray-900">{client.email}</p>
                      <p className="text-sm text-gray-500">{client.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {client.lines} linha{client.lines !== 1 ? 's' : ''}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={client.status === 'Ativo' ? 'default' : 'secondary'}
                      className={
                        client.status === 'Ativo' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }
                    >
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="mr-1 h-4 w-4" />
                      {new Date(client.created).toLocaleDateString('pt-BR')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Clients;
