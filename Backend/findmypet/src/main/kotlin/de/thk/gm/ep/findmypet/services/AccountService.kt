package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.models.Account
import java.util.UUID

interface AccountService {
    fun getAll(): List<Account>
    fun getById(id: UUID): Account?

}