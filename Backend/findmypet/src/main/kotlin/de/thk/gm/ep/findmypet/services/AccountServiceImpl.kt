package de.thk.gm.ep.findmypet.services

import de.thk.gm.ep.findmypet.models.Account
import de.thk.gm.ep.findmypet.repositories.AccountRepository
import java.util.*

class AccountServiceImpl(
    private val accountRepository: AccountRepository
): AccountService {
    override fun getAll(): List<Account> {
        return accountRepository.findAll().toList()
    }

    override fun getById(id: UUID): Account? {
        return accountRepository.findById(id).orElse(null)
    }
}