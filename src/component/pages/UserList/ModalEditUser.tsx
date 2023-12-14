// UserList.tsx
import React, { useEffect, useState } from 'react'
import { user } from '../../../apis/api' // Import your authentication API instance
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid
} from '@mui/material'
import "./UserList.css"
import { UpdateUserType, UserType } from '../../../store/user/userType'
import AlertMassage from '../../common/AlertMassage'
import { responseStatus } from '../../../const/constant'

interface dataProps {
    title: string
    data: UserType | undefined
    isOpen?: boolean
    onClose: () => void
}

const ModalEditUser: React.FC<dataProps> = ({ title, data, isOpen, onClose }) => {
    const [id, setId] = useState<number | undefined>()
    const [name, setName] = useState<string | undefined>()
    const [username, setUsername] = useState<string | undefined>()
    const [password, setPassword] = useState<string | undefined>()
    const [email, setEmail] = useState<string | undefined>()
    const [phone, setPhone] = useState<string | undefined>()
    const [website, setWebsite] = useState<string | undefined>()
    const [street, setStreet] = useState<string | undefined>()
    const [suite, setSuite] = useState<string | undefined>()
    const [city, setCity] = useState<string | undefined>()
    const [zipcode, setZipcode] = useState<string | undefined>()
    const [geoLat, setGeoLat] = useState<string | undefined>()
    const [geoLng, setGeoLng] = useState<string | undefined>()
    const [companyName, setCompanyName] = useState<string | undefined>()
    const [catchPhrase, setCatchPhrase] = useState<string | undefined>()
    const [bs, setBs] = useState<string | undefined>()
    const [disableSaveBtn, setDisableSaveBtn] = useState<boolean>(false)
    const [status, setStatus] = useState<string>()

    useEffect(() => {
        setStatus(undefined)
        if (isOpen) {
            setId(undefined)
            setName(undefined)
            setUsername(undefined)
            setPassword(undefined)
            setEmail(undefined)
            setPhone(undefined)
            setWebsite(undefined)
            setStreet(undefined)
            setSuite(undefined)
            setCity(undefined)
            setZipcode(undefined)
            setGeoLat(undefined)
            setGeoLng(undefined)
            setCompanyName(undefined)
            setCatchPhrase(undefined)
            setBs(undefined)
        } else if (data) {
            setId(data.id)
            setName(data.name || '')
            setUsername(data.username || '')
            setPassword(undefined)
            setEmail(data.email || '')
            setPhone(data.phone || '')
            setWebsite(data.website || '')
            setStreet(data.address?.street || '')
            setSuite(data.address?.suite || '')
            setCity(data.address?.city || '')
            setZipcode(data.address?.zipcode || '')
            setGeoLat(data.address?.geo?.lat || '')
            setGeoLng(data.address?.geo?.lng || '')
            setCompanyName(data.company?.name || '')
            setCatchPhrase(data.company?.catchPhrase || '')
            setBs(data.company?.bs || '')
        }
    }, [data, isOpen])

    useEffect(() => {
        if ((!!id || !!isOpen) &&
            !!name &&
            !!username &&
            !!email &&
            !!phone &&
            !!website &&
            !!street &&
            !!suite &&
            !!city &&
            !!zipcode &&
            !!geoLat &&
            !!geoLng &&
            !!companyName &&
            !!catchPhrase &&
            !!bs) {
            setDisableSaveBtn(false)
        } else
            setDisableSaveBtn(true)
    }, [id,
        name,
        username,
        email,
        phone,
        website,
        street,
        suite,
        city,
        zipcode,
        geoLat,
        geoLng,
        companyName,
        catchPhrase,
        bs,
    ])
    const editUser = async () => {
        // let param:UserType = {}
        console.log("edit user")
        if ((!!id || !!password) &&
            !!name &&
            !!username &&
            !!email &&
            !!phone &&
            !!website &&
            !!street &&
            !!suite &&
            !!city &&
            !!zipcode &&
            !!geoLat &&
            !!geoLng &&
            !!companyName &&
            !!catchPhrase &&
            !!bs) {
            let payload: UpdateUserType = {
                name, username, email, phone, website,
                address: {
                    street, suite, city, zipcode,
                    geo: {
                        lat: geoLat,
                        lng: geoLng
                    }
                },
                company: {
                    name: companyName,
                    catchPhrase,
                    bs
                }
            }
            try {
                if (id)
                    await user.updateUser(id, payload).then((res) => {
                        if (res.data.message == "success") {
                            onClose()
                        }
                        else
                            setStatus(responseStatus.ERROR)
                    })
                else {
                    payload['password'] = password
                    await user.createUser(payload).then((res) => {
                        if (res.data.message == "success") {
                            onClose()
                        }
                        else
                            setStatus(responseStatus.ERROR)
                    })
                }
            } catch (error) {
                console.log(error)
                setStatus(responseStatus.ERROR)
            }
        }
    }

    return (
        <Dialog open={!!data || !!isOpen} onClose={onClose} maxWidth="md" fullWidth>
            {status ? <AlertMassage message={status} status={status} /> : null}
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Grid container spacing={3} columns={10} style={{ marginTop: "1px" }}>
                    {id
                        ? <Grid item xs={5}>
                            <TextField disabled={true} label="ID" value={id} fullWidth />
                        </Grid>
                        : null
                    }
                    <Grid item xs={5}>
                        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth />
                    </Grid>
                    {!id
                        ? <Grid item xs={5}>
                            <TextField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
                        </Grid>
                        : null
                    }
                    <Grid item xs={5}>
                        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField label="Website" value={website} onChange={(e) => setWebsite(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField label="City" value={city} onChange={(e) => setCity(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField label="Street" value={street} onChange={(e) => setStreet(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField label="Suite" value={suite} onChange={(e) => setSuite(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField label="Zipcode" value={zipcode} onChange={(e) => setZipcode(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField label="Geo Lat" value={geoLat} onChange={(e) => setGeoLat(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField label="Geo Lng" value={geoLng} onChange={(e) => setGeoLng(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField label="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField label="Catchphrase" value={catchPhrase} onChange={(e) => setCatchPhrase(e.target.value)} fullWidth />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField label="BS" value={bs} onChange={(e) => setBs(e.target.value)} fullWidth />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    disabled={disableSaveBtn}
                    variant="contained"
                    color={id ? 'primary' : 'success'}
                    onClick={() => editUser()}>
                    {id ? "Save" : "Create"}
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => onClose()}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog >
    )
}

export default ModalEditUser
